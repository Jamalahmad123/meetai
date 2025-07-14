"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";

import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  ClockFadingIcon,
  CornerDownRightIcon,
  LoaderIcon,
  MoreHorizontal,
} from "lucide-react";

import { MeetingGetMany, MeetingGetOne } from "../../types";

import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const statusMap = {
  upcoming: {
    icon: ClockArrowUpIcon,
    color: "bg-yellow-500/20 text-yellow-800 border-yellow-800/5",
  },
  active: {
    icon: LoaderIcon,
    color: "bg-blue-500/20 text-blue-800 border-blue-800/5",
  },
  completed: {
    icon: CircleCheckIcon,
    color: "bg-emerald-500/20 text-emerald-800 border-emerald-800/5",
  },
  processing: {
    icon: LoaderIcon,
    color: "bg-gray-500/20 text-gray-800 border-gray-800/5",
  },
  cancelled: {
    icon: CircleXIcon,
    color: "bg-rose-500/20 text-rose-800 border-rose-800/5",
  },
};

export const columns: ColumnDef<MeetingGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <span className="font-semibold capitalize">{row.original.name}</span>
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-2">
            <CornerDownRightIcon className="size-3 text-muted-foreground" />
            <p className="text-sm truncate capitalize text-muted-foreground max-w-52">
              {row.original.agent.name}
            </p>
          </div>
          <GeneratedAvatar
            variant="botttsNeutral"
            seed={row.original.agent.name}
            className="size-4"
          />
          <span className="text-sm text-muted-foreground">
            {row.original.startedAt
              ? format(row.original.startedAt, "MMM d")
              : ""}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = statusMap[row.original.status];

      return (
        <Badge
          variant="outline"
          className={cn(
            "capitalize [&>svg]:size-4 text-muted-foreground",
            status.color
          )}
        >
          <status.icon
            className={cn(
              row.original.status === "processing" && "animate-spin"
            )}
          />
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize [&>svg]:size-4 flex items-center gap-x-2">
        <ClockFadingIcon className="text-blue-700" />
        {
          row.original.duration ?? "No Duration"
        }
      </Badge>
    )
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsRow meeting={row.original} />,
    size: 40,
  },
];

const ActionsRow = ({ meeting }: { meeting: MeetingGetOne }) => {
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
              <Link href={`/meeting/${meeting.id}`}>View</Link>
            </DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <DeleteAgentAlert agentId={agent.id} /> */}
      </AlertDialog>
      {/* <EditAgentDialog agent={agent} /> */}
    </Dialog>
  );
};
