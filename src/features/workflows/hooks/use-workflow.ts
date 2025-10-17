import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useQueryStates } from "nuqs";
import { toast } from "sonner";
import { workflowsParams } from "../params";

export const useWorkflowParams = () => {
  return useQueryStates(workflowsParams);
};

export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();
  const [params] = useWorkflowParams();
  return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params));
};

export const useCreateWorkflow = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow ${data.name} created successfully`);
        router.push(`/workflows/${data.id}`);
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
      },
      onError: (error) => {
        toast.error(
          `Failed to create workflow. Please try again., ${error.message}`,
        );
      },
    }),
  );
};

export const useDeleteWorkflow = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  return useMutation(
    trpc.workflows.delete.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow ${data.name} removed`);
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryOptions({ id: data.id }),
        );
      },
      onError: (error) => {
        toast.error(
          `Failed to delete workflow. Please try again., ${error.message}`,
        );
      },
    }),
  );
};
