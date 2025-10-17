import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";
import {
  AlertTriangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Loader2Icon,
  MoreVerticalIcon,
  PackageOpenIcon,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Item, ItemContent, ItemMedia, ItemTitle } from "./ui/item";
import { Spinner } from "./ui/spinner";

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
          <Button onClick={onCreate} disabled={isDisabled || isLoading}>
            {isLoading ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <PlusIcon className="size-4" />
            )}
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
    <div className="container mx-auto max-w-6xl space-x-4 space-y-6">
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

interface StateViewProps {
  message?: string;
}

export const EntityLoadingView = ({ message }: StateViewProps) => {
  return (
    <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-4">
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          {!!message && (
            <ItemTitle className="line-clamp-1">{message}</ItemTitle>
          )}
        </ItemContent>
      </Item>
    </div>
  );
};

export const EntityErrorView = ({ message }: StateViewProps) => {
  return (
    <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-4">
      <Item variant="muted">
        <ItemMedia>
          <AlertTriangleIcon className="size-4 text-destructive animate-pulse" />
        </ItemMedia>
        <ItemContent>
          {!!message && (
            <ItemTitle className="line-clamp-1">{message}</ItemTitle>
          )}
        </ItemContent>
      </Item>
    </div>
  );
};

interface EmptyViewProps extends StateViewProps {
  onNew?: () => void;
}

export const EntityEmptyView = ({ message, onNew }: EmptyViewProps) => {
  return (
    <Empty className="border border-dashed bg-white">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PackageOpenIcon />
        </EmptyMedia>
      </EmptyHeader>
      <EmptyTitle>No items found</EmptyTitle>
      <EmptyDescription>
        {!!message && <ItemTitle className="line-clamp-1">{message}</ItemTitle>}
      </EmptyDescription>
      {!!onNew && (
        <EmptyContent>
          <Button onClick={onNew}>
            <PlusIcon className="size-4" />
            Create New
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
};

interface EntityListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey?: (item: T, index: number) => string | number;
  emptyView?: React.ReactNode;
  className?: string;
}

export function EntityList<T>({
  items,
  renderItem,
  getKey,
  emptyView,
  className,
}: EntityListProps<T>) {
  if (items.length === 0 && emptyView) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <div className="max-w-sm mx-auto">{emptyView}</div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      {items.map((item, index) => (
        <div key={getKey ? getKey(item, index) : index}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

interface EntityItemProps {
  href: string;
  title: string;
  subtitle?: React.ReactNode;
  image?: React.ReactNode;
  actions?: React.ReactNode;
  onRemove?: () => void;
  isRemoving?: boolean;
  className?: string;
}

export const EntityItem = ({
  href,
  title,
  subtitle,
  image,
  actions,
  onRemove,
  isRemoving,
  className,
}: EntityItemProps) => {
  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isRemoving) return;
    if (onRemove) {
      await onRemove();
    }
  };
  return (
    <Link href={href} prefetch>
      <Card
        className={cn(
          "p-4 shadow-none cursor-pointer",
          isRemoving && "opacity-50 cursor-not-allowed",
          className,
        )}
      >
        <CardContent className="flex items-center justify-between p-0">
          <div className="flex items-center gap-3">
            {image}
            <div>
              <CardTitle className="text-base font-medium">{title}</CardTitle>
              {!!subtitle && (
                <CardDescription className="text-sm text-muted-foreground">
                  {subtitle}
                </CardDescription>
              )}
            </div>
          </div>

          {(actions || onRemove) && (
            <div className="flex gap-x-4 item-center">
              {actions}
              {onRemove && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVerticalIcon className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenuItem onClick={handleRemove}>
                      <Trash2Icon className="size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
