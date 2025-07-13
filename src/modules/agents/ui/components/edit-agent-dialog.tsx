import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AgentForm } from "./agent-form"
import { AgentGetOne } from "../../types"

type AgentFormProps = {
  agent: AgentGetOne
}

export const EditAgentDialog = ({ agent }: AgentFormProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Agent</DialogTitle>
        <DialogDescription>Edit {agent.name}</DialogDescription>
      </DialogHeader>
      <AgentForm initialValues={agent} />
    </DialogContent>
  )
}
