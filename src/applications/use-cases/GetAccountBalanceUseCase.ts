import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { NotFoundError } from "../../error-handling/errors";

export interface GetAccountBalanceResponse {
  balance: number;
}

export class GetAccountBalanceUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute(accountId: string): Promise<GetAccountBalanceResponse> {
    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      throw new NotFoundError(`Account with ID ${accountId} not found`);
    }
    return {
      balance: account.balance,
    };
  }
}
