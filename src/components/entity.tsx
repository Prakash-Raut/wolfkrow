import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type EntityHeaderProps = {
  title: string;
  description?: string;
  createButtonLabel?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  onCreate?: () => void;
  createButtonHref?: string;
};

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

type EntitySearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const EntitySearch = ({
  value,
  onChange,
  placeholder = "Search",
}: EntitySearchProps) => {
  return (
    <div className="relative ml-auto">
      <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        className="max-w-[200px] bg-background shadow-none border-none pl-8"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

type EntityPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

export const EntityPagination = ({
  page,
  totalPages,
  onPageChange,
  disabled,
}: EntityPaginationProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {page} of {totalPages ?? 1}
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1 || disabled}
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          <ChevronLeftIcon className="size-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages || disabled}
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        >
          <ChevronRightIcon className="size-4" />
          Next
        </Button>
      </div>
    </div>
  );
};
