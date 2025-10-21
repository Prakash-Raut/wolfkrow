"use client";

import { NodeToolbar, Position } from "@xyflow/react";
import { Settings2Icon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";

interface WorkflowNodeProps {
  name?: string;
  children: React.ReactNode;
  description?: string;
  showToolbar?: boolean;
  onDelete?: () => void;
  onSettings?: () => void;
}

export const WorkflowNode = ({
  name,
  children,
  description,
  showToolbar = false,
  onDelete,
  onSettings,
}: WorkflowNodeProps) => {
  return (
    <>
      {showToolbar && (
        <NodeToolbar>
          <Button size="sm" variant="ghost" onClick={onSettings}>
            <Settings2Icon className="size-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={onDelete}>
            <Trash2Icon className="size-4" />
          </Button>
        </NodeToolbar>
      )}
      {children}
      {name && (
        <NodeToolbar
          position={Position.Bottom}
          isVisible
          className="max-w-[200px] text-center"
        >
          <p className="font-medium">{name}</p>
          {description && (
            <p className="text-sm text-muted-foreground truncate">
              {description}
            </p>
          )}
        </NodeToolbar>
      )}
    </>
  );
};
