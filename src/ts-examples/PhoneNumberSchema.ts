import { z } from "zod";

const PhoneNumberSchema = z.preprocess(
  (val) => (typeof val === "string" ? val.replace(/\D/g, "") : val),
  z.string().length(10)
);

const correctPhoneNumber = "1234567890";
const incorrectPhoneNumber = "123456789";

const validatePhoneNumber = (
  phoneNumber: z.infer<typeof PhoneNumberSchema>
) => {
  try {
    const parsedPhoneNumber = PhoneNumberSchema.parse(phoneNumber);
    console.log("Validation passed: ", parsedPhoneNumber);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation failed: ", error.issues[0].message);
    } else {
      console.error("Unexpected error: ", error);
    }
  }
};

validatePhoneNumber(correctPhoneNumber);
validatePhoneNumber(incorrectPhoneNumber);
