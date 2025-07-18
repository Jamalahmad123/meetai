"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AgentIdHeader } from "../components/agent-id-header";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";

interface Props {
  agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {

  const trpc = useTRPC();


  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  return (
    <div className="flex flex-col flex-1 gap-y-4 px-4 py-4 md:px-8">
      <AgentIdHeader
        agent={data}
      />
      <div className="bg-white rounded-lg border">
        <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
          <div className="flex items-center gap-x-3">
            <GeneratedAvatar variant="botttsNeutral" seed={data.name} className="size-10" />
            <h2 className="font-medium text-2xl">{data.name}</h2>
          </div>
          <Badge variant="outline" className="flex items-center gap-x-2 [&>svg]:size-4">
            <VideoIcon className="text-blue-700" />
            {data.meetingCount} {data.meetingCount === 1 ? "meeting" : "meetings"}
          </Badge>
          <div className="flex flex-col gap-y-4">
            <p className="text-lg font-medium">Instructions</p>
            <p className="text-neutral-800">{data.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
