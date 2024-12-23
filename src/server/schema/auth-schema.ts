import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).trim(),
  password: z
    .string()
    .min(8, { message: 'passowrd must be at least 8 character' })
    .trim(),
});
