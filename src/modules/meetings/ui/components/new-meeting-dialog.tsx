import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { MeetingForm } from "./meeting-form";

export const NewMeetingDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          New Meeting
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Meeting</DialogTitle>
          <DialogDescription>Create a new meeting</DialogDescription>
        </DialogHeader>
        <MeetingForm />
      </DialogContent>
    </Dialog>
  );
};
