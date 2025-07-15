import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { BanIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export const MeetingStateWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
    {children}
  </div>
}

export const UpcomingState = ({ meetingId }: { meetingId: string }) => {
  return (
    <>
      <EmptyState
        imgSrc="/upcoming.svg"
        title="Not started yet"
        description="Once you start this meeting, a summary will appear here."
      />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        <Button variant="secondary" className="w-full lg:w-auto">
          <BanIcon />
          Cancel Meeting
        </Button>
        <Button asChild className="w-full lg:w-auto">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Start Meeting
          </Link>
        </Button>
      </div>
    </>
  );
};

export const ActiveState = ({ meetingId }: { meetingId: string }) => {
  return <>
    <EmptyState
      imgSrc="/upcoming.svg"
      title="Meeting is active"
      description="Meeting will end once all participants have left."
    />
    <Button asChild className="w-full lg:w-auto">
      <Link href={`/call/${meetingId}`}>
        <VideoIcon />
        Join Meeting
      </Link>
    </Button>
  </>
}

export const CancelledState = () => {
  return <>
    <EmptyState
      imgSrc="/cancelled.svg"
      title="Meeting cancelled"
      description="This meeting was cancelled."
    />
  </>
}

export const ProcessingState = () => {
  return <>
    <EmptyState
      imgSrc="/processing.svg"
      title="Meeting completed"
      description="This meeting was completed, a summary will appear soon."
    />
  </>
}
