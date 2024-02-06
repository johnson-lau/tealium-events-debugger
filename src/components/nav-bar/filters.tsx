import { useFilters } from "@/lib/filters-context/use-filters";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React, { Suspense, lazy } from "react";
import { IconButton } from "../icon-button/icon-button";
import { Badge } from "../ui/badge";
import classes from "./nav-bar.module.css";

// import FiltersPopoverContent from "./filters-content";
const FiltersPopoverContent = lazy(() => import("./filters-content"));

function Filters() {
  const [open, setOpen] = React.useState(false);
  const { selectedFilters } = useFilters();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div>
          {selectedFilters.size > 0 ? (
            <Badge
              className="px-2 py-0 text-xs cursor-pointer"
              variant={"secondary"}
            >
              {selectedFilters.size}
            </Badge>
          ) : (
            <IconButton
              className={`${classes.button}`}
              onClick={() => {}}
              title="Filter fields"
              icon={faFilter}
              size="1x"
            />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 z-50 w-72 rounded-md border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
        <Suspense fallback={<></>}>
          <FiltersPopoverContent />
        </Suspense>
      </PopoverContent>
    </Popover>
  );
}

export { Filters };
