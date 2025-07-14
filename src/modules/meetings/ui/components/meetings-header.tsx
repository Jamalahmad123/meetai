
"use client"

import { NewMeetingDialog } from "./new-meeting-dialog"



export const MeetingsHeader = () => {
  return (
    <div className="py-4 px-4 md:px-8 flex flex-col">
      <div className="flex items-center justify-between">
        <h5 className="font-medium text-xl">My Meetings</h5>
        <NewMeetingDialog />
      </div>
      {/* <MeetingsSearchFilter /> */}
    </div>
  )
}
