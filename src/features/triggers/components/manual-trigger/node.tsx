"use client";

import { NodeStatus } from "@/components/react-flow/node-status-indicator";
import type { NodeProps } from "@xyflow/react";
import { MousePointer2Icon } from "lucide-react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { ManualTriggerDialog } from "./dialog";

export const ManualTriggerNode = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const nodeStatus: NodeStatus = "loading";

  const handleSettings = () => {
    setDialogOpen(true);
  };

  const handleDoubleClick = () => {
    console.log("Double click");
  };

  return (
    <>
      <ManualTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <BaseTriggerNode
        {...props}
        icon={MousePointer2Icon}
        name="When clicking 'Execute workflow'"
        status={nodeStatus}
        onSettings={handleSettings}
        onDoubleClick={handleDoubleClick}
      />
    </>
  );
});
