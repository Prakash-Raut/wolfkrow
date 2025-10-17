import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.workflows.get.queryOptions());
};

export const useCreateWorkflow = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: (data) => {
        if (!data) return;
        toast.success(`Workflow ${data.name} created successfully`);
        router.push(`/workflows/${data.id}`);
        queryClient.invalidateQueries(trpc.workflows.get.queryOptions());
      },
      onError: (error) => {
        toast.error(
          `Failed to create workflow. Please try again., ${error.message}`,
        );
      },
    }),
  );
};
