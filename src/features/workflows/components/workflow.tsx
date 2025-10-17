"use client";

import {
  EntityContainer,
  EntityEmptyView,
  EntityErrorView,
  EntityHeader,
  EntityItem,
  EntityList,
  EntityLoadingView,
  EntityPagination,
  EntitySearch,
} from "@/components/entity";
import { Workflow } from "@/generated/prisma";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { formatDistanceToNow } from "date-fns";
import { WorkflowIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useCreateWorkflow,
  useDeleteWorkflow,
  useSuspenseWorkflows,
  useWorkflowParams,
} from "../hooks/use-workflow";

export const WorkflowSearch = () => {
  const [params, setParams] = useWorkflowParams();
  const { searchValue, onSearchChange } = useEntitySearch({
    params,
    setParams,
  });
  return (
    <EntitySearch
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search workflows"
    />
  );
};

export const WorkflowList = () => {
  const { data: workflows } = useSuspenseWorkflows();

  return (
    <EntityList
      items={workflows.items}
      getKey={(workflow) => workflow.id}
      renderItem={(workflow) => <WorkflowItem workflow={workflow} />}
      emptyView={<WorkflowEmpty />}
    />
  );
};

export const WorkflowsHeader = () => {
  const { handleError, modal } = useUpgradeModal();
  const createWorkflow = useCreateWorkflow();

  const handleCreateWorkflow = () => {
    createWorkflow.mutate(undefined, {
      onError: (error) => {
        handleError(error);
      },
    });
  };

  return (
    <>
      {modal}
      <EntityHeader
        title="Workflows"
        description="Create and manage your workflows"
        onCreate={handleCreateWorkflow}
        createButtonLabel="New Workflow"
        isDisabled={false}
        isLoading={createWorkflow.isPending}
      />
    </>
  );
};

export const WorkflowPagination = () => {
  const { data: workflows, isFetching } = useSuspenseWorkflows();
  const [params, setParams] = useWorkflowParams();

  return (
    <EntityPagination
      page={workflows.page}
      totalPages={workflows.totalPages}
      onPageChange={(page) => setParams({ ...params, page })}
      disabled={isFetching}
    />
  );
};

export const WorkflowContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<WorkflowSearch />}
      pagination={<WorkflowPagination />}
    >
      {children}
    </EntityContainer>
  );
};

export const WorkflowLoading = () => {
  return <EntityLoadingView message="Loading workflows..." />;
};

export const WorkflowError = () => {
  return (
    <EntityErrorView message="An error occurred while loading workflows. Please try again later." />
  );
};

export const WorkflowEmpty = () => {
  const router = useRouter();
  const createWorkflow = useCreateWorkflow();
  const { handleError } = useUpgradeModal();

  const handleCreateWorkflow = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };

  return (
    <>
      <EntityEmptyView
        message="You haven't created any workflows yet. Get started by creating your first workflow."
        onNew={handleCreateWorkflow}
      />
    </>
  );
};

export const WorkflowItem = ({ workflow }: { workflow: Workflow }) => {
  const removeWorkflow = useDeleteWorkflow();

  const handleRemove = () => {
    removeWorkflow.mutate({ id: workflow.id });
  };

  return (
    <EntityItem
      href={`/workflows/${workflow.id}`}
      title={workflow.name}
      subtitle={
        <>
          Updated {formatDistanceToNow(workflow.updatedAt, { addSuffix: true })}{" "}
          {""}
          &bull; Created{" "}
          {formatDistanceToNow(workflow.createdAt, { addSuffix: true })}
        </>
      }
      image={
        <div className="size-8 flex items-center justify-center">
          <WorkflowIcon className="size-5 text-muted-foreground" />
        </div>
      }
      onRemove={handleRemove}
      isRemoving={removeWorkflow.isPending}
    />
  );
};
