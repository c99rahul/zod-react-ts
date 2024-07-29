import { z } from "zod";
import { PositiveNumberSchema } from "./PositiveNumberSchema";

export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: PositiveNumberSchema,
});
