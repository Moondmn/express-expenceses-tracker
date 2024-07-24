import { z } from "zod";
import { expencesesSchema } from "~/modules/groups/expenceses/model/expenceses.model";

export const groupSchema = z.object({
  id: z.number(),
  name: z.string(),
  permissions: z.array(z.string()),
  userlist: z.array(z.number()),
  groupbalance: z.number(),
  expences: z.array(expencesesSchema).nullish(),
});

export type Group = z.infer<typeof groupSchema>;
