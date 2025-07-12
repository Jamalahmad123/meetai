import { SearchIcon, XCircleIcon } from "lucide-react";

import { useAgentsFilters } from "../../hooks/use-agents-filters";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const AgentsSearchFilter = () => {
  const [filters, setFilters] = useAgentsFilters();

  const isAnyFilters = !!filters.search;

  const onClearFilters = () => {
    setFilters({
      search: "",
    });
  };

  return (
    <div className="flex items-center gap-x-2 p-1">
      <div className="relative">
        <Input
          className="bg-background w-52 pl-7"
          placeholder="Filter by name"
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
        />
        <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
      </div>
      {isAnyFilters && (
        <Button variant="outline" size="sm" onClick={onClearFilters}>
          <XCircleIcon />
          Clear
        </Button>
      )}
    </div>
  );
};
