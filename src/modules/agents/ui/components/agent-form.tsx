import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { AgentInsertType, agentsInsertSchema } from "../../schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { AgentGetOne } from "../../types"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client"
import { toast } from "sonner"
import { closeDialog } from "@/components/ui/dialog"


type AgentFormProps = {
  initialValues?: AgentGetOne
}

export const AgentForm = ({ initialValues }: AgentFormProps) => {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const isEdit = !!initialValues?.id


  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions(),

        )
        // TODO: invalidateQueries for free tier
        closeDialog();
        toast.success("Agent created successfully")
      },
      onError: (error) => {
        toast.error(error.message)

        // TODO: check if error code is "FORBIDDEN", redirect to "/upgrade"
      }
    })
  )

  const updateAgent = useMutation(
    trpc.agents.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions(),

        )


        if (isEdit) {
          queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({
              id: initialValues.id
            })
          )
        }
        closeDialog();
        toast.success("Agent updated successfully")
      },
      onError: (error) => {
        toast.error(error.message)

        // TODO: check if error code is "FORBIDDEN", redirect to "/upgrade"
      }
    })
  )

  const form = useForm<AgentInsertType>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      instructions: initialValues?.instructions ?? ""
    }
  })


  const isPending = createAgent.isPending || updateAgent.isPending

  const onSubmit = (data: AgentInsertType) => {
    if (isEdit) {
      updateAgent.mutate({ ...data, id: initialValues.id })
      return;
    }

    createAgent.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="space-y-4" disabled={isPending}>
          <GeneratedAvatar seed={form.watch("name")} variant="botttsNeutral" className="border size-16" />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea placeholder="You are a helpful math assistant that can answer questions and help with assignments" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-end justify-end">
            <Button disabled={isPending}>
              {isEdit ? "Update" : "Create"}
            </Button>
          </div>
        </fieldset>
      </form>
    </Form>
  )
}
