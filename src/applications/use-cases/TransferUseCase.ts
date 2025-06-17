import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { Account } from "../../domain/entities/Account";
import { NotFoundError } from "../../error-handling/errors";

export interface TransferRequest {
  origin: string;
  destination: string;
  amount: number;
}

export interface TransferResponse {
  origin: {
    id: string;
    balance: number;
  };
  destination: {
    id: string;
    balance: number;
  };
}

export class TransferUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute(request: TransferRequest): Promise<TransferResponse> {
    const { origin, destination, amount } = request;

    if (amount <= 0) {
      throw new Error("Transfer amount must be greater than zero");
    }

    const originAccount = await this.accountRepository.findById(origin);
    if (!originAccount) {
      throw new NotFoundError(`Origin account with ID ${origin} not found`);
    }

    let destinationAccount = await this.accountRepository.findById(destination);
    if (!destinationAccount) {
      destinationAccount = new Account(destination, 0); // Create a new account if it doesn't exist
      await this.accountRepository.save(destinationAccount);
    }

    originAccount.withdraw(amount);
    destinationAccount.deposit(amount);

    await this.accountRepository.update(originAccount);
    await this.accountRepository.update(destinationAccount);

    return {
      origin: {
        id: originAccount.id,
        balance: originAccount.balance,
      },
      destination: {
        id: destinationAccount.id,
        balance: destinationAccount.balance,
      },
    };
  }
}
