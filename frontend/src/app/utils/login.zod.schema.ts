import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      RegExp("(.*[a-z].*)"),
      "Password should contains at least 1 Lowercase"
    )
    .regex(
      RegExp("(.*[A-Z].*)"),
      "Password should contains at least 1 Uppercase"
    )
    .regex(RegExp("(.*\\d.*)"), "Password should contains at least 1 Number"),
});
