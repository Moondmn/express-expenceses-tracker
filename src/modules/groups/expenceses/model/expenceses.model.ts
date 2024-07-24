import { z } from "zod";

export const expencesesSchema = z.object({
  id: z.number(),
  title: z.string(),
  desc: z.string(),
  amount: z.number(),
  date: z.string(),
  payerUsername: z.string(),
});

export type Expenceses = z.infer<typeof expencesesSchema>;
