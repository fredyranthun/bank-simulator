import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export function validateSchema(schema: z.ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorDetails = error.errors.map((err) => ({
          message: err.message,
        }));

        res.status(400).json({
          error: "Validation failed",
          issues: errorDetails,
        });
      } else {
        console.error("Unexpected error during validation:", error);
        res.status(500).json({
          error: "Internal server error",
        });
      }
    }
  };
}
