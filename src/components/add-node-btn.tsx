"use client";

import { PlusIcon } from "lucide-react";
import { memo, useState } from "react";
import { NodeSelector } from "./node-selector";
import { Button } from "./ui/button";

export const AddNodeBtn = memo(() => {
  const [open, setOpen] = useState(false);

  return (
    <NodeSelector open={open} onOpenChange={setOpen}>
      <Button
        size="icon"
        variant="outline"
        onClick={() => {}}
        className="bg-background"
      >
        <PlusIcon className="size-4" />
      </Button>
    </NodeSelector>
  );
});

AddNodeBtn.displayName = "AddNodeBtn";
