import { z } from "zod";

export const PositiveNumberSchema = z.number().refine((n) => n > 0, {
  // Return the error message here
  message: "Number must be positive",
});
