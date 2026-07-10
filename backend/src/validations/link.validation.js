import { z } from "zod";

export const createLinkSchema = z.strictObject({
  longUrl: z.string().url("Enter a valid URL"),

  customAlias: z
    .string()
    .trim()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_-]+$/)
    .optional(),

  expiresAt: z.string().datetime().optional(),
});