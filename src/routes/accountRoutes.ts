import { Router } from "express";
import { AccountController } from "../controllers/AccountController";
import { validateSchema } from "../middleware/validation-middleware";
import { eventSchema } from "../schemas/event-schema";

export function createAccountRoutes(accountController: AccountController): Router {
  const router = Router();

  // Define the routes for account operations
  router.get("/balance", (req, res) => accountController.getBalance(req, res));
  router.post("/event", validateSchema(eventSchema), (req, res) => accountController.processEvent(req, res));
  router.post("/reset", (req, res) => accountController.reset(req, res));

  return router;
}
