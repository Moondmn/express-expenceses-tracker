import { z } from "zod";

export const userAuthDto = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type UserAuth = z.infer<typeof userAuthDto>;
