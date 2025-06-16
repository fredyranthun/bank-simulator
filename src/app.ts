import express from "express";
import { InMemoryAccountRepository } from "./infra/repositories/InMemoryAccountRepository";
import { GetAccountBalanceUseCase } from "./applications/use-cases/GetAccountBalanceUseCase";
import { DepositUseCase } from "./applications/use-cases/DepositUseCase";
import { AccountController } from "./controllers/AccountController";
import { WithdrawUseCase } from "./applications/use-cases/WithdrawUseCase";
import { TransferUseCase } from "./applications/use-cases/TransferUseCase";
import { createAccountRoutes } from "./routes/accountRoutes";
import { ResetAccountsUseCase } from "./applications/use-cases/ResetAccountsUseCase";

const app = express();
app.use(express.json());

// Initialize the in-memory account repository and use cases
const accountRepository = InMemoryAccountRepository.getInstance();
const getAccountBalanceUseCase = new GetAccountBalanceUseCase(accountRepository);
const depositUseCase = new DepositUseCase(accountRepository);
const withdrawUseCase = new WithdrawUseCase(accountRepository);
const transferUseCase = new TransferUseCase(accountRepository);
const resetAccountsUseCase = new ResetAccountsUseCase(accountRepository);

// Initialize the account controller with the use cases
const accountController = new AccountController(
  depositUseCase,
  getAccountBalanceUseCase,
  withdrawUseCase,
  transferUseCase,
  resetAccountsUseCase
);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/", createAccountRoutes(accountController));

export default app;
