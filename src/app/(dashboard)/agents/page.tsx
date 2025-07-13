import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { auth } from "@/lib/auth";
import type { SearchParams } from "nuqs";

import { getQueryClient, trpc } from "@/trpc/server";

import { LoadingState } from "@/components/loading-state";
import AgentsHeader from "@/modules/agents/ui/components/agents-header";
import AgentsView from "@/modules/agents/ui/views/agents-view";
import { loadSearchParams } from "@/modules/agents/params";

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
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions(params));

  return (
    <>
      <AgentsHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoadingState title="Loading Agents" />}>
          <AgentsView />
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default Page;
