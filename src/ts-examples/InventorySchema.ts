import { z } from "zod";

export const InventoryItemSchema = z.object({
  quantity: z.number().int().nonnegative(),
  location: z.string(),
});

