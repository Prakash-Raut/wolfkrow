"use client";

import { UpgradeModel } from "@/components/upgrade-modal";
import { TRPCClientError } from "@trpc/client";
import { useState } from "react";

export const useUpgradeModal = () => {
  const [open, setOpen] = useState(false);

  const handleError = (error: unknown) => {
    if (error instanceof TRPCClientError) {
      if (error.data?.code === "FORBIDDEN") {
        setOpen(true);
        return true;
      }
    }
    return false;
  };

  const modal = open ? (
    <UpgradeModel open={open} onOpenChange={setOpen} />
  ) : null;

  return {
    handleError,
    modal,
  };
};
