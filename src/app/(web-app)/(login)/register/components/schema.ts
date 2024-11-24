import { z } from "zod"

export const RegisterSchemas = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .regex(/^[a-zA-Z]+$/, {
      message: "First name must not contain special characters or numbers",
    }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .regex(/^[a-zA-Z]+$/, {
      message: "Last name must not contain special characters or numbers",
    }),
  username: z
    .string()
    .min(8, { message: "Username must be at least 8 characters long" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
})
