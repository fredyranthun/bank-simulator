import { IAccountRepository } from "../../domain/repositories/IAccountRepository";

export class ResetAccountsUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute(): Promise<void> {
    await this.accountRepository.cleanUp();
  }
}
