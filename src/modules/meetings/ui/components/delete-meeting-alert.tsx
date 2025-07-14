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
  agentId,
  isViewPage,
}: {
  agentId: string;
  isViewPage?: boolean;
}) => {
  const router = useRouter();
  const trpc = useTRPC();

  const queryClient = useQueryClient();

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions());

        // TODO: invilidate free tier usage

        if (isViewPage) {
          router.push("/agents");
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
            removeAgent.mutate({
              id: agentId,
            })
          }
        >
          Confirm
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
