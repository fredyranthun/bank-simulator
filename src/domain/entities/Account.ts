export class Account {
  constructor(
    public id: string,
    public balance: number = 0
  ) {
    if (typeof balance !== "number" || balance < 0) {
      throw new Error("Initial balance must be a non-negative number");
    }
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  withdraw(amount: number): void {
    this.balance -= amount;
  }

  transfer(amount: number, destination: Account): void {
    this.withdraw(amount);
    destination.deposit(amount);
  }
}
