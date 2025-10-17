import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";

type EntityHeaderProps = {
  title: string;
  description?: string;
  createButtonLabel?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
} & (
  | {
      /** Click handler for create button */
      onCreate: () => void;
      /** Optional href for button link */
      createButtonHref?: string;
    }
  | {
      /** Href for button link when no click handler */
      createButtonHref: string;
      onCreate?: never;
    }
  | {
      /** No button interactions */
      createButtonHref?: never;
      onCreate?: never;
    }
);

export const EntityHeader = ({
  title,
  description,
  createButtonLabel,
  isDisabled,
  isLoading,
  onCreate,
  createButtonHref,
}: EntityHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between space-y-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex flex-row items-center gap-2">
        {createButtonLabel && (
          <Button onClick={onCreate} disabled={isDisabled}>
            <PlusIcon className="size-4" />
            {createButtonLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

type EntityContainerProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  search?: React.ReactNode;
  pagination?: React.ReactNode;
};

export const EntityContainer = ({
  children,
  header,
  search,
  pagination,
}: EntityContainerProps) => {
  return (
    <div className="container mx-auto max-w-screen-xl space-x-4 space-y-6">
      <div className="flex flex-col space-y-8">{header}</div>
      <div className="flex flex-col space-y-4">
        {search}
        {children}
      </div>
      {pagination}
    </div>
  );
};
