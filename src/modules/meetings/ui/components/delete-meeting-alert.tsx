import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const DeleteMeetingAlert = ({
  meetingId,
  isViewPage,
}: {
  meetingId: string;
  isViewPage?: boolean;
}) => {
  const router = useRouter();
  const trpc = useTRPC();

  const queryClient = useQueryClient();

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions());

        // TODO: invilidate free tier usage

        if (isViewPage) {
          router.push("/meetings");
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Are you sure you want to delete this meeting?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. The meeting and all related data will be
          permanently removed.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() =>
            removeMeeting.mutate({
              id: meetingId,
            })
          }
        >
          Confirm
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
