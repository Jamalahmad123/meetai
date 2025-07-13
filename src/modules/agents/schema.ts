import { z } from "zod";

export const agentsInsertSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  instructions: z.string().min(1, { message: "Instructions is required" }),
})

export type AgentInsertType = z.infer<typeof agentsInsertSchema>

export const agentUpdateSchema = agentsInsertSchema.extend({
  id: z.string().min(1, { message: "Agent Id is required" })
})

export type AgentUpdateType = z.infer<typeof agentUpdateSchema>