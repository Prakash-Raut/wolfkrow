"use client";

import {
  EntityContainer,
  EntityHeader,
  EntityPagination,
  EntitySearch,
} from "@/components/entity";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";
import {
  useCreateWorkflow,
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
    <div className="">
      <pre className="font-semibold whitespace-pre-wrap">
        {JSON.stringify(workflows, null, 2)}
      </pre>
    </div>
  );
};

export const WorkflowsHeader = () => {
  const router = useRouter();
  const { handleError, modal } = useUpgradeModal();
  const createWorkflow = useCreateWorkflow();

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
