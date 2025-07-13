"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AgentGetOne } from "../../types"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { CornerRightDownIcon, MoreHorizontal, VideoIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const columns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <GeneratedAvatar variant="botttsNeutral" seed={row.original.name} className="size-6" />
          <span className="font-semibold capitalize">{row.original.name}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <CornerRightDownIcon className="size-3 text-muted-foreground" />
          <p className="text-sm truncate capitalize text-muted-foreground max-w-52">{row.original.instructions}</p>
        </div>
      </div>
    )
  },
  {
    accessorKey: "meetingCount",
    header: "Meetings",
    cell: ({ row }) => (
      <Badge variant="outline" className="flex items-center gap-x-2 [&>svg]:size-4">
        <VideoIcon className="text-blue-700" />
        {row.original.meetingCount} {row.original.meetingCount === 1 ? "meeting" : "meetings"}
      </Badge>
    )
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsRow agent={row.original} />,
    size: 40,
  },
]

type DialogType = "None" | "Delete" | "Edit"

const ActionsRow = ({ agent }: { agent: AgentGetOne }) => {
  const [dialogType, setDialogType] = useState<DialogType>("None");

  const handleDialogType = (type: DialogType) => setDialogType(type);


  return (
    <Dialog>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/agents/${agent.id}`}>
                View
              </Link>
            </DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem onClick={() => handleDialogType("Edit")}>
                Edit
              </DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem onClick={() => handleDialogType("Delete")}>
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* TODO: Delete alert */}
      </AlertDialog>
      {/* TODO: Edit dialog */}
    </Dialog>
  );
};