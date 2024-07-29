import { z } from "zod";

export const UserEmailSchema = z.string().email().trim();
