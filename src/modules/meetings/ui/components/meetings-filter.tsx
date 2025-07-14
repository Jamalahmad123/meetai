import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  LoaderIcon,
  SearchIcon,
  VideoIcon,
  XCircleIcon,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { CommandSelect } from "@/components/command-select";
import { MeetingStatus } from "../../types";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const options = [
  {
    id: MeetingStatus.Upcoming,
    value: MeetingStatus.Upcoming,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <ClockArrowUpIcon />
        {MeetingStatus.Upcoming}
      </div>
    ),
  },
  {
    id: MeetingStatus.Completed,
    value: MeetingStatus.Completed,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleCheckIcon />
        {MeetingStatus.Completed}
      </div>
    ),
  },
  {
    id: MeetingStatus.Active,
    value: MeetingStatus.Active,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <VideoIcon />
        {MeetingStatus.Active}
      </div>
    ),
  },
  {
    id: MeetingStatus.Processing,
    value: MeetingStatus.Processing,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <LoaderIcon />
        {MeetingStatus.Processing}
      </div>
    ),
  },
  {
    id: MeetingStatus.Cancelled,
    value: MeetingStatus.Cancelled,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleXIcon />
        {MeetingStatus.Cancelled}
      </div>
    ),
  },
];

export const MeetingsFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();

  const isAnyFilters = !!filters.search || !!filters.status || filters.agentId;

  const onClearFilters = () => {
    setFilters({
      search: "",
      agentId: "",
      status: null,
    });
  };

  return (
    <ScrollArea>
      <div className="flex items-center gap-x-2 p-1 mb-2">
        <div className="relative">
          <Input
            className="bg-background w-52 pl-7"
            placeholder="Filter by name"
            value={filters.search}
            onChange={(e) => {
              if (e.target.value) {
                setFilters({ search: e.target.value, page: 1 })
              }
            }}
          />
          <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>
        <CommandSelect
          options={options}
          value={filters.status ?? ""}
          onChange={(value) => setFilters({ status: value as MeetingStatus })}
          placeholder="Select Status"
        />
        <AgentFilter
          value={filters.agentId ?? ""}
          onChange={(value) => setFilters({ agentId: value })}
        />
        {isAnyFilters && (
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            <XCircleIcon />
            Clear
          </Button>
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

interface AgentFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const AgentFilter = ({ value, onChange }: AgentFilterProps) => {
  const trpc = useTRPC();

  const [search, setSearch] = useState("");

  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search,
    })
  );

  return (
    <CommandSelect
      options={(agents.data?.items || []).map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
          <div className="flex items-center gap-x-2">
            <GeneratedAvatar
              variant="botttsNeutral"
              seed={agent.name}
              className="border size-6"
            />
            <span>{agent.name}</span>
          </div>
        ),
      }))}
      value={value}
      onChange={onChange}
      onSearch={setSearch}
      placeholder="Select Agent"
    />
  );
};
