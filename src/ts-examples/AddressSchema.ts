import { z } from "zod";

export const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  zipCode: z.string().length(5),
});

type Address = z.infer<typeof AddressSchema>;

const validateAddress = (address: Address) => {
  try {
    const parsedAddress = AddressSchema.parse(address);
    console.log("Validation passed: ", parsedAddress);
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

const validAddress = {
  street: "My street",
  city: "My city",
  zipCode: "24840",
};

const invalidAddress = {
  street: "My street",
  city: "My city",
  zipCode: "2484",
};

validateAddress(validAddress);
validateAddress(invalidAddress);
