import { Request, Response } from "express";

import { DepositUseCase } from "../applications/use-cases/DepositUseCase";
import { GetAccountBalanceUseCase } from "../applications/use-cases/GetAccountBalanceUseCase";
import { WithdrawUseCase } from "../applications/use-cases/WithdrawUseCase";
import { TransferUseCase } from "../applications/use-cases/TransferUseCase";

import { AccountValidator } from "../validators.ts/AccountValidator";

export class AccountController {
  constructor(
    private depositUseCase: DepositUseCase,
    private getAccountBalanceUseCase: GetAccountBalanceUseCase,
    private withdrawUseCase: WithdrawUseCase,
    private transferUseCase: TransferUseCase
  ) {}

  public async processEvent(req: Request, res: Response) {
    const { type } = req.body;

    try {
      switch (type) {
        case "deposit":
          return this.deposit(req, res);
        case "withdraw":
          return this.withdraw(req, res);
        case "transfer":
          return this.transfer(req, res);
        default:
          res.status(400).json({ error: "Invalid event type" });
      }
    } catch (error) {
      console.error("Error processing event:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deposit(req: Request, res: Response) {
    const { destination, amount } = req.body;

    try {
      const response = await this.depositUseCase.execute({
        destination,
        amount: amount,
      });
      res.status(201).json(response);
      return;
    } catch (error) {
      console.error("Error during deposit:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }

  async withdraw(req: Request, res: Response) {
    const { origin, amount } = req.body;

    try {
      const response = await this.withdrawUseCase.execute({ amount, origin });
      if (!response) {
        res.status(404).send("0");
        return;
      }
      res.status(200).json(response);
    } catch (error) {
      console.error("Error during withdrawal:", error);
      res.status(500);
    }
  }

  async transfer(req: Request, res: Response) {
    const { origin, destination, amount } = req.body;

    try {
      const response = await this.transferUseCase.execute({
        amount,
        origin,
        destination,
      });
      if (!response) {
        res.status(404).send("0");
        return;
      }
      res.status(201).json(response);
      return;
    } catch (error) {
      console.error("Error during transfer:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getBalance(req: Request, res: Response) {
    const { account_id: accountId } = req.query;
    const validation = AccountValidator.validateAccountId(accountId);

    if (!validation.isValid) {
      res.status(400).json({ errors: validation.errors });
      return;
    }

    try {
      const response = await this.getAccountBalanceUseCase.execute(accountId as string);
      if (!response) {
        res.status(404).send("0");
        return;
      }
      res.status(200).send(response.balance);
    } catch (error) {
      console.error("Error fetching account balance:", error);
      res.status(500).send();
    }
  }
}
