import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Suspense } from "react"

import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

import { auth } from "@/lib/auth"

import { LoadingState } from "@/components/loading-state"
import { AgentIdView } from "@/modules/agents/ui/views/agent-id-view"

interface Props {
  params: Promise<{ agentId: string }>
}


const Page = async ({ params }: Props) => {

  const { agentId } = await params

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/sign-in")
  }

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  )



  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingState title="Loading Agent" />}>
        <AgentIdView agentId={agentId} />
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page