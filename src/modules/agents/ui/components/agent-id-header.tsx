import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { DeleteAgentAlert } from "./delete-agent-alert";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { EditAgentDialog } from "./edit-agent-dialog";
import { AgentGetOne } from "../../types";



interface Props {
  agent: AgentGetOne
}

export const AgentIdHeader = ({ agent }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="font-medium text-xl">
              <Link href="/agents">My Agents</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-foreground text-xl font-medium [&>svg]:size-4" />
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="font-medium text-xl text-foreground">
              <Link href={`/agents/${agent.id}`}>{agent.name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Dialog>
        <AlertDialog>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <MoreVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <PencilIcon className="size-4 text-black" />
                  Edit
                </DropdownMenuItem>
              </DialogTrigger>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem>
                  <TrashIcon className="size-4 text-black" />
                  Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteAgentAlert agentId={agent.id} isViewPage={true} />
        </AlertDialog>
        <EditAgentDialog agent={agent} />
      </Dialog>
    </div>
  )
}
