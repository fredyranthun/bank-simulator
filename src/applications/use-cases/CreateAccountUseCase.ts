import { Account } from "../../domain/entities/Account";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository";

export interface CreateAccountRequest {
  accountId: string;
  balance: number;
}

export interface CreateAccountResponse {
  accountId: string;
  balance: number;
}

export class CreateAccountUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute(request: CreateAccountRequest): Promise<CreateAccountResponse> {
    const existingAccount = await this.accountRepository.findById(request.accountId);
    if (existingAccount) {
      throw new Error("Account already exists");
    }

    const newAccount = new Account(request.accountId, request.balance);
    await this.accountRepository.save(newAccount);

    return {
      accountId: newAccount.id,
      balance: newAccount.balance,
    };
  }
}
