"use client";

import { EntityErrorView, EntityLoadingView } from "@/components/entity";
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflow";

export const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);
  return (
    <section>
      <h1> Editor {workflowId} </h1>
      <pre>{JSON.stringify(workflow, null, 2)}</pre>
    </section>
  );
};

export const EditorLoading = () => {
  return <EntityLoadingView message="Loading editor..." />;
};

export const EditorError = () => {
  return (
    <EntityErrorView message="An error occurred while loading editor. Please try again later." />
  );
};
