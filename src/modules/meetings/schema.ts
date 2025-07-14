import { z } from "zod";


export const meetingsInsertSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  agentId: z.string().min(1, { message: "Agent is Required" })
})

export type MeetingsInsetType = z.infer<typeof meetingsInsertSchema>

export const updateMeetingSchema = meetingsInsertSchema.extend({
  id: z.string().min(1, { message: "Meeting Id is required" })
})

export type MeetingUpdateType = z.infer<typeof updateMeetingSchema>