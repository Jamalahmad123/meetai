"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { GeneratedAvatar } from "@/components/generated-avatar";
import { MeetingIdHeader } from "../components/meeting-id-header";

interface Props {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  return (
    <div className="flex flex-col flex-1 gap-y-4 px-4 py-4 md:px-8">
      <MeetingIdHeader meeting={data} />
      <div className="bg-white rounded-lg border">
        <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
          <div className="flex items-center gap-x-3">
            <GeneratedAvatar
              variant="botttsNeutral"
              seed={data.name}
              className="size-10"
            />
            <h2 className="font-medium text-2xl">{data.name}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
