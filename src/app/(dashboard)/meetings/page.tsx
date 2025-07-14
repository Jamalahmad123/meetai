import { Suspense } from "react";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { MeetingsView } from "@/modules/meetings/ui/views/meetings-view";
import { LoadingState } from "@/components/loading-state";
import { MeetingsHeader } from "@/modules/meetings/ui/components/meetings-header";

const Page = () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions());

  return (
    <>
      <MeetingsHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoadingState title="Loading Meetings" />}>
          <MeetingsView />
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default Page;
