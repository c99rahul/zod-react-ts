import { z } from "zod";
import { InventoryItemSchema } from "./InventorySchema";
import { ProductSchema } from "./ProductSchema";
import { v4 as uuidv4 } from "uuid";

type UUID = string;
const newUUID: UUID = uuidv4();

const StockItemSchema = ProductSchema.merge(InventoryItemSchema);

const validateStockItem = (cart: z.infer<typeof StockItemSchema>) => {
  try {
    const parsedStockItem = StockItemSchema.parse(cart);
    console.log("Validation passed: ", parsedStockItem);
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

const validStockItem = {
  id: newUUID,
  name: "Paper clips",
  price: 3,
  quantity: 5,
  location: "Bangalore",
};

const invalidStockItem = {
  id: "109820384-239234-234234",
  name: "Photo frame",
  price: 7,
  quantity: 2,
  location: "Mumbai",
};

validateStockItem(validStockItem);
validateStockItem(invalidStockItem);
