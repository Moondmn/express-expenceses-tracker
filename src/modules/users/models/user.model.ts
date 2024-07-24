import { z } from "zod";

export enum Role {
  admin = "admin",
  user = "user",
}

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  //   email: z.string().email(),
  password: z.string(),
  role: z.union([z.literal(Role.admin), z.literal(Role.user)]),
  groupsJoined: z.array(z.string()),
});

export type User = z.infer<typeof userSchema>;
