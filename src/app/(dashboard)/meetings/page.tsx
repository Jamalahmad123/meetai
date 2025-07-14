import { Suspense } from "react";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { auth } from "@/lib/auth";

import type { SearchParams } from "nuqs";

import { MeetingsView } from "@/modules/meetings/ui/views/meetings-view";
import { LoadingState } from "@/components/loading-state";
import { MeetingsHeader } from "@/modules/meetings/ui/components/meetings-header";
import { loadSearchParams } from "@/modules/meetings/params";

interface Props {
  searchParams: Promise<SearchParams>;
}

const Page = async ({ searchParams }: Props) => {
  const params = await loadSearchParams(searchParams);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions(params));

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
