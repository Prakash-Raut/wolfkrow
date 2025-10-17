"use client";

import { EntityHeader } from "@/components/entity";
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflow";

export const WorkflowList = () => {
  const { data: workflows } = useSuspenseWorkflows();

  return (
    <div className="">
      <pre className="font-semibold whitespace-pre-wrap">
        {JSON.stringify(workflows, null, 2)}
      </pre>
    </div>
  );
};

export const WorkflowsHeader = () => {
  const createWorkflow = useCreateWorkflow();

  const handleCreateWorkflow = () => {
    createWorkflow.mutate(undefined, {
      onError: (error) => {
        console.error(
          `Failed to create workflow. Please try again., ${error.message}`,
        );
      },
    });
  };

  return (
    <>
      <EntityHeader
        title="Workflows"
        description="Create and manage your workflows"
        onCreate={handleCreateWorkflow}
        createButtonLabel="New Workflow"
        createButtonHref="/workflows/new"
        isDisabled={false}
        isLoading={createWorkflow.isPending}
      />
    </>
  );
};
