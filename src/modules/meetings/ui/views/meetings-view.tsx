"use client";

import { DataTable } from "@/components/data-table";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";



export const MeetingsView = () => {

  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions()
  );


  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable data={data.items} columns={columns} />
      {/* <DataPagination
        page={filters.page}
        totalPages={data.totalPage}
        onPageChange={(page) =>
          setFilters({
            page,
          })
        }
      /> */}
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first meeting"
          description="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas and interact with participants in real time."
        />
      )}
    </div>
  )
}
