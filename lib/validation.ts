import { z } from "zod";

export const RegisterStep1Schema1 = z.object({
  email: z.string().email(),
  name: z.string().min(3),
});

export const RegisterStep1Schema2 = z.object({
  password: z.string().min(6),
  username: z.string().min(3),
});

export const LoginSchema = z.object({
  password: z.string().min(6),
  email: z.string().email(),
});
