
"use client"

import { NewAgentDialog } from "./new-agent-dialog"
import { AgentsSearchFilter } from "./agents-search-filter"


const AgentsHeader = () => {
  return (
    <div className="py-4 px-4 md:px-8 flex flex-col">
      <div className="flex items-center justify-between">
        <h5 className="font-medium text-xl">My Agents</h5>
        <NewAgentDialog />
      </div>
      <AgentsSearchFilter />
    </div>
  )
}

export default AgentsHeader