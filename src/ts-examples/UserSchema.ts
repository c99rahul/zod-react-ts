import { z } from "zod";
import { AddressSchema } from "./AddressSchema";
import { UserEmailSchema } from "./UserEmailSchema";
import { PositiveNumberSchema } from "./PositiveNumberSchema";
import { v4 as uuidv4 } from "uuid";

type UUID = string;
const newUUID: UUID = uuidv4();

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: UserEmailSchema,
  address: AddressSchema,
  age: PositiveNumberSchema,
});

const validateUser = (user: z.infer<typeof UserSchema>) => {
  try {
    const parsedUser = UserSchema.parse(user);
    console.log("Validation passed: ", parsedUser);
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

const validUser = {
  id: newUUID,
  name: "John",
  email: "john@doe.tld",
  address: {
    street: "John's street",
    city: "John's city",
    zipCode: "00700",
  },
  age: 32,
};

const invalidUser = {
  id: "8489834-48034-349803",
  name: "Jane",
  email: "jane at the rate doe dot tld",
  address: {
    street: "Jane's street",
    city: "Jane's city",
    zipCode: "12345",
  },
  age: 27,
};

validateUser(validUser);
validateUser(invalidUser);
