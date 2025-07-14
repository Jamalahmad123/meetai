"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { MeetingIdHeader } from "../components/meeting-id-header";
import { ActiveState, CancelledState, MeetingStateWrapper, ProcessingState, UpcomingState } from "../components/meeting-states";


const meetingState = {
  upcoming: UpcomingState,
  active: ActiveState,
  processing: ProcessingState,
  completed: () => <div>completed</div>,
  cancelled: CancelledState
}


interface Props {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const CurrentState = meetingState[data.status]

  return (
    <div className="flex flex-col flex-1 gap-y-4 px-4 py-4 md:px-8">
      <MeetingIdHeader meeting={data} />
      <MeetingStateWrapper>
        <CurrentState meetingId={meetingId} />
      </MeetingStateWrapper>
    </div>
  );
};
