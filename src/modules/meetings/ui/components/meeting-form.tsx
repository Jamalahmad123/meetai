import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";
import { MeetingGetOne } from "../../types";
import { meetingsInsertSchema, MeetingsInsetType } from "../../schema";
import React, { useState } from "react";
import { CommandSelect } from "@/components/command-select";
import { closeDialog } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

type MeetingFormProps = {
  initialValues?: MeetingGetOne;
};

export const MeetingForm = ({ initialValues }: MeetingFormProps) => {
  const router = useRouter()
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");

  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search,
    })
  );

  const isEdit = !!initialValues?.id;

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions());
        // TODO: invalidateQueries for free tier
        router.push(`/meetings/${data.id}`)
        closeDialog()
        toast.success("Meeting created successfully");
      },
      onError: (error) => {
        toast.error(error.message);

        // TODO: check if error code is "FORBIDDEN", redirect to "/upgrade"
      },
    })
  );

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions());

        if (isEdit) {
          queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({
              id: initialValues.id,
            })
          );
        }
        closeDialog()
        toast.success("Meeting updated successfully");
      },
      onError: (error) => {
        toast.error(error.message);

        // TODO: check if error code is "FORBIDDEN", redirect to "/upgrade"
      },
    })
  );

  const form = useForm<MeetingsInsetType>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? undefined,
    },
  });

  const isPending = createMeeting.isPending || updateMeeting.isPending;

  const onSubmit = (data: MeetingsInsetType) => {
    if (isEdit) {
      updateMeeting.mutate({ ...data, id: initialValues.id });
      return;
    }

    createMeeting.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="space-y-4" disabled={isPending}>
          <GeneratedAvatar
            seed={form.watch("name")}
            variant="botttsNeutral"
            className="border size-16"
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Math Consultation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="agentId"
            render={({ field: { value, onChange, ...rest } }) => (
              <FormItem>
                <FormLabel>Select Agent</FormLabel>
                <FormControl>
                  <CommandSelect
                    options={(agents.data?.items || []).map((agent) => ({
                      id: agent.id,
                      value: agent.id,
                      children: (
                        <div className="flex items-center gap-x-2">
                          <GeneratedAvatar
                            variant="botttsNeutral"
                            seed={agent.name}
                            className="border size-6"
                          />
                          <span>{agent.name}</span>
                        </div>
                      ),
                    }))}
                    value={value}
                    onChange={onChange}
                    onSearch={setSearch}
                    placeholder="Select Agent"
                    {...rest}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-end justify-end">
            <Button disabled={isPending}>{isEdit ? "Update" : "Create"}</Button>
          </div>
        </fieldset>
      </form>
    </Form>
  );
};