import { z } from "zod";

export const eventSchema = z
  .object({
    type: z.enum(["deposit", "withdraw", "transfer"]),
    amount: z.number().int().positive(),
    origin: z.string().optional(),
    destination: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.type === "deposit") {
        return data.destination !== undefined && data.origin === undefined;
      }
      if (data.type === "withdraw") {
        return data.origin !== undefined && data.destination === undefined;
      }
      if (data.type === "transfer") {
        return data.origin !== undefined && data.destination !== undefined;
      }
      return false;
    },
    {
      message: "Invalid event data: ensure correct fields are provided for the event type",
    }
  );

export type EventInput = z.infer<typeof eventSchema>;
