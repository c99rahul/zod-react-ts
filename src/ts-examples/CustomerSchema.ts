import { z } from "zod";
import { UserSchema } from "./UserSchema";

const CustomerSchema = UserSchema.extend({
  loyaltyPoints: z.number().int().nonnegative(),
});
