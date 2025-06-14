import express from "express";
import { InMemoryAccountRepository } from "./infra/repositories/InMemoryAccountRepository";
import { GetAccountBalanceUseCase } from "./applications/use-cases/GetAccountBalanceUseCase";
import { DepositUseCase } from "./applications/use-cases/DepositUseCase";
import { AccountController } from "./controllers/AccountController";
import { WithdrawUseCase } from "./applications/use-cases/WithdrawUseCase";
import { TransferUseCase } from "./applications/use-cases/TransferUseCase";
import { createAccountRoutes } from "./routes/accountRoutes";

const app = express();
app.use(express.json());

const accountRepository = InMemoryAccountRepository.getInstance();

const getAccountBalanceUseCase = new GetAccountBalanceUseCase(accountRepository);
const depositUseCase = new DepositUseCase(accountRepository);
const withdrawUseCase = new WithdrawUseCase(accountRepository);
const transferUseCase = new TransferUseCase(accountRepository);

const accountController = new AccountController(
  depositUseCase,
  getAccountBalanceUseCase,
  withdrawUseCase,
  transferUseCase
);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/", createAccountRoutes(accountController));

export default app;
