import { z } from "zod";

const UserBioSchema = z.string().min(25).max(120);
let userBio = "I'm John Doe, a Web developer and Tech writer.";

try {
  const parsedUserBio = UserBioSchema.parse(userBio);
  console.log(parsedUserBio);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error(error.issues);
  } else {
    console.error("Unexpecte error", error);
  }
}
