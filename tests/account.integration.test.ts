import app from "../src/app";

import request from "supertest";

describe("Account Integration Tests", () => {
  it("should reset accounts and return 200", async () => {
    const response = await request(app).post("/reset");

    expect(response.status).toBe(200);
    expect(response.text).toBe("OK");
  });

  it("should return 404 for a non-existing account balance", async () => {
    const response = await request(app).get("/balance").query({ account_id: "1234" });

    expect(response.status).toBe(404);
    expect(response.text).toBe("0");
  });

  it("should create a new account on deposit if it does not exist", async () => {
    const response = await request(app).post("/event").send({ type: "deposit", destination: "100", amount: 10 });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      destination: {
        id: "100",
        balance: 10,
      },
    });
  });

  it("should deposit to an existing account", async () => {
    const response = await request(app).post("/event").send({ type: "deposit", destination: "100", amount: 10 });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      destination: {
        id: "100",
        balance: 20,
      },
    });
  });

  it("should return a balance for an existing account", async () => {
    const response = await request(app).get("/balance").query({ account_id: "100" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(20);
  });

  it("should withdraw from an existing account", async () => {
    const response = await request(app).post("/event").send({ type: "withdraw", origin: "100", amount: 5 });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      origin: {
        id: "100",
        balance: 15,
      },
    });
  });

  it("should return 404 for withdrawal from a non-existing account", async () => {
    const response = await request(app).post("/event").send({ type: "withdraw", origin: "200", amount: 10 });

    expect(response.status).toBe(404);
    expect(response.text).toBe("0");
  });

  it("should transfer from existing account", async () => {
    const response = await request(app).post("/event").send({
      type: "transfer",
      origin: "100",
      destination: "300",
      amount: 15,
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      origin: {
        id: "100",
        balance: 0,
      },
      destination: {
        id: "300",
        balance: 15,
      },
    });
  });

  it("should return 404 for transfer from a non-existing account", async () => {
    const response = await request(app).post("/event").send({
      type: "transfer",
      origin: "200",
      destination: "300",
      amount: 10,
    });

    expect(response.status).toBe(404);
    expect(response.text).toBe("0");
  });
});
