import express from "express";

const app = express();
app.use(express.json());

const accounts = new Map<string, { balance: number }>();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/balance", (req, res) => {
  if (!req.query["account_id"]) {
    res.status(400).json({ error: "Account ID is required" });
    return;
  }
  const accountId = req.query["account_id"] as string;
  const account = accounts.get(accountId);
  if (account) {
    res.send(account.balance.toString());
  } else {
    res.status(404).send("0");
  }
});

app.post("/reset", (req, res) => {
  accounts.clear();
  res.send("OK");
});

app.post("/event", (req, res) => {
  const { type, destination, amount, origin } = req.body as {
    type: string;
    destination?: string;
    origin?: string;
    amount: number;
  };

  if (type === "deposit" && destination) {
    if (!accounts.has(destination)) {
      accounts.set(destination, { balance: 0 });
    }
    const account = accounts.get(destination);
    if (account) {
      account.balance += amount;
    }

    res.status(201).json({
      destination: {
        id: destination,
        balance: account ? account.balance : amount,
      },
    });
    return;
  }
  if (type === "withdraw" && origin) {
    if (!accounts.has(origin)) {
      res.status(404).send("0");
    }
    const account = accounts.get(origin);
    if (account) {
      account.balance -= amount;
    }

    res.status(201).json({
      origin: {
        id: origin,
        balance: account ? account.balance : -amount,
      },
    });
    return;
  }

  if (type === "transfer" && origin && destination) {
    if (!accounts.has(origin)) {
      res.status(404).send("0");
      return;
    }
    if (!accounts.has(destination)) {
      accounts.set(destination, { balance: 0 });
    }
    const originAccount = accounts.get(origin);
    const destinationAccount = accounts.get(destination);
    if (originAccount && destinationAccount) {
      originAccount.balance -= amount;
      destinationAccount.balance += amount;
    }

    res.status(201).json({
      origin: {
        id: origin,
        balance: originAccount ? originAccount.balance : -amount,
      },
      destination: {
        id: destination,
        balance: destinationAccount ? destinationAccount.balance : amount,
      },
    });
    return;
  }
});

export default app;
