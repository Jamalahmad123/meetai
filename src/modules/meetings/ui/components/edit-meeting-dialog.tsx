import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MeetingGetOne } from "../../types"
import { MeetingForm } from "./meeting-form"

type MeetingFormProps = {
  meeting: MeetingGetOne
}

export const EditMeetingDialog = ({ meeting }: MeetingFormProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Meeting</DialogTitle>
        <DialogDescription>Edit {meeting.name}</DialogDescription>
      </DialogHeader>
      <MeetingForm initialValues={meeting} />
    </DialogContent>
  )
}
