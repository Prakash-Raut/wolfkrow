"use client";

import type { NodeProps } from "@xyflow/react";
import { MousePointer2Icon } from "lucide-react";
import { memo } from "react";
import { BaseTriggerNode } from "../base-trigger-node";

export const ManualTriggerNode = memo((props: NodeProps) => {
  const handleSettings = () => {
    console.log("Settings");
  };

  const handleDoubleClick = () => {
    console.log("Double click");
  };

  return (
    <>
      <BaseTriggerNode
        {...props}
        id={props.id}
        icon={MousePointer2Icon}
        name="When clicking 'Execute workflow'"
        // status={nodeStatus}
        // description={description}
        onSettings={handleSettings}
        onDoubleClick={handleDoubleClick}
      />
    </>
  );
});
