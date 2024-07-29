import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

type UUID = string;
const newUUID: UUID = uuidv4();

const CartSchema = z.record(z.string().uuid(), z.number().int().positive());

const validateCart = (cart: z.infer<typeof CartSchema>) => {
  try {
    const parsedCart = CartSchema.parse(cart);
    console.log("Validation passed: ", parsedCart);
  } catch (error) {
    if (error instanceof z.ZodError) {
      for (const issue of error.issues) {
        console.error("Validation failed: ", issue.message);
      }
    } else {
      console.error("Unexpected error: ", error);
    }
  }
};

const validCart = {
  [newUUID]: 25,
};

const invalidCart = {
  "09190234-22343242-82034": 50,
};

validateCart(validCart);
validateCart(invalidCart);
