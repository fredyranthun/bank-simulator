import { Account } from "../../domain/entities/Account";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository";

export class InMemoryAccountRepository implements IAccountRepository {
  private static instance: InMemoryAccountRepository;
  private accounts: Map<string, Account>;

  private constructor() {
    this.accounts = new Map<string, Account>();
  }

  public static getInstance(): InMemoryAccountRepository {
    if (!InMemoryAccountRepository.instance) {
      InMemoryAccountRepository.instance = new InMemoryAccountRepository();
    }
    return InMemoryAccountRepository.instance;
  }

  async save(account: Account): Promise<Account> {
    this.accounts.set(account.id, account);
    return account;
  }

  async findById(id: string): Promise<Account | null> {
    return this.accounts.get(id) || null;
  }

  async findAll(): Promise<Account[]> {
    return Array.from(this.accounts.values());
  }

  async update(account: Account): Promise<Account> {
    this.accounts.set(account.id, account);
    return account;
  }

  async cleanUp(): Promise<void> {
    this.accounts.clear();
  }
}
