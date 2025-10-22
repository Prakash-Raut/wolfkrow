"use client";

import type { Node, NodeProps } from "@xyflow/react";
import { Globe2Icon } from "lucide-react";
import { memo } from "react";
import { BaseExecutionNode } from "./base-execution-node";

type HttpRequestNodeData = {
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: string;
  [key: string]: unknown;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const nodeData = props.data as HttpRequestNodeData;
  const description = nodeData?.endpoint
    ? `${nodeData.method || "GET"} ${nodeData.endpoint}`
    : "Not configured";

  const handleSettings = () => {
    console.log("Settings");
  };

  const handleDoubleClick = () => {
    console.log("Double click");
  };

  return (
    <>
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon={Globe2Icon}
        name="HTTP Request"
        description={description}
        onSettings={handleSettings}
        onDoubleClick={handleDoubleClick}
      />
    </>
  );
});
