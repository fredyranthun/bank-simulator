import { Account } from "../../domain/entities/Account";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository";

export interface DepositRequest {
  destination: string;
  amount: number;
}

export interface DepositResponse {
  destination: {
    id: string;
    balance: number;
  };
}

export class DepositUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute(request: DepositRequest): Promise<DepositResponse> {
    if (request.amount <= 0) {
      throw new Error("Deposit amount must be greater than zero");
    }

    let account = await this.accountRepository.findById(request.destination);
    if (!account) {
      account = new Account(request.destination, 0); // Create a new account if it doesn't exist
      await this.accountRepository.save(account);
    }

    account.deposit(request.amount);
    await this.accountRepository.update(account);

    return {
      destination: {
        id: account.id,
        balance: account.balance,
      },
    };
  }
}
