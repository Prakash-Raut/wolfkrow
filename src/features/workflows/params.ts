import { PAGINATION } from "@/config/constants";
import { createLoader, parseAsInteger, parseAsString } from "nuqs/server";

//Describe your search params, and reuse this in useQueryStates / createSerializer:
export const workflowsParams = {
  page: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
  pageSize: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE_SIZE)
    .withOptions({ clearOnDefault: true }),
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
};

export const loadWorkflowsParams = createLoader(workflowsParams);
