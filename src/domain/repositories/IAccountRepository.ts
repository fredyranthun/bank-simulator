import { Account } from "../entities/Account";

export interface IAccountRepository {
  save(account: Account): Promise<Account>;
  findById(id: string): Promise<Account | null>;
  findAll(): Promise<Account[]>;
  update(account: Account): Promise<Account>;
  cleanUp(): Promise<void>;
}
