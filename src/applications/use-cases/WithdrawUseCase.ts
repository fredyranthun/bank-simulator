import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { BadRequestError, NotFoundError } from "../../error-handling/errors";

export interface WithdrawUseCaseRequest {
  origin: string;
  amount: number;
}

export interface WithdrawUseCaseResponse {
  origin: {
    id: string;
    balance: number;
  };
}

export class WithdrawUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute(request: WithdrawUseCaseRequest): Promise<WithdrawUseCaseResponse | null> {
    if (request.amount <= 0) {
      throw new BadRequestError("Withdrawal amount must be greater than zero");
    }

    const account = await this.accountRepository.findById(request.origin);
    if (!account) {
      throw new NotFoundError(`Account with ID ${request.origin} not found`);
    }

    account.withdraw(request.amount);
    await this.accountRepository.update(account);
    return {
      origin: {
        id: account.id,
        balance: account.balance,
      },
    };
  }
}
