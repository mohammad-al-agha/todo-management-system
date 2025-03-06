import { z } from "zod";

const registerSchame = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
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
export default registerSchame;
