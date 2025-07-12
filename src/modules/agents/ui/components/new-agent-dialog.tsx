import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { useIsMobile } from "@/hooks/use-mobile"
import { PlusIcon } from "lucide-react"
import { AgentForm } from "./agent-form"


const NewAgentDialog = () => {
  const isMobile = useIsMobile()


  if (isMobile) {
    return <Drawer>
      <DrawerTrigger asChild>
        <Button>
          <PlusIcon />
          New Agent
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>New Agent</DrawerTitle>
          <DrawerDescription>Create a new agent</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <AgentForm />
        </div>
      </DrawerContent>
    </Drawer>
  }

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