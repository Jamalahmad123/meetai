import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusIcon } from "lucide-react"
import { AgentForm } from "./agent-form"


const NewAgentDialog = () => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          New Agent
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Agent</DialogTitle>
          <DialogDescription>Create a new agent</DialogDescription>
        </DialogHeader>
        <AgentForm />
      </DialogContent>
    </Dialog>
  )
}

export default NewAgentDialog