import { IAccountRepository } from "../../domain/repositories/IAccountRepository";

export interface GetAccountBalanceResponse {
  balance: number;
}

export class GetAccountBalanceUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute(accountId: string): Promise<GetAccountBalanceResponse | null> {
    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      return null;
    }
    return {
      balance: account.balance,
    };
  }
}
