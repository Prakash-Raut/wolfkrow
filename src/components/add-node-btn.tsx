"use client";

import { PlusIcon } from "lucide-react";
import { memo } from "react";
import { Button } from "./ui/button";

export const AddNodeBtn = memo(() => {
  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => {}}
      className="bg-background"
    >
      <PlusIcon className="size-4" />
    </Button>
  );
});

AddNodeBtn.displayName = "AddNodeBtn";
