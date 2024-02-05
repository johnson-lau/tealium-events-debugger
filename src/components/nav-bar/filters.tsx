import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFilters } from "@/lib/filters-context/use-filters";
import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React from "react";
import { IconButton } from "../icon-button/icon-button";
import { Badge } from "../ui/badge";
import classes from "./nav-bar.module.css";

function Filters() {
  const { filterOptions, selectedFilters, toggleFilter, isSelected } =
    useFilters();
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div>
          {selectedFilters.size > 0 ? (
            <Badge className="px-2 py-0 text-xs" variant={"secondary"}>
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
        <Command>
          <CommandInput placeholder="Search fields..." />
          <CommandEmpty>No field found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-[200px]">
              {filterOptions.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={toggleFilter}
                  className={`font-normal normal-case ${
                    isSelected(option) ? "bg-teal-900/10" : ""
                  }`}
                >
                  <IconButton
                    onClick={() => {}}
                    title="Filter fields"
                    icon={isSelected(option) ? faSquareCheck : faSquare}
                    size="1x"
                    className="mr-2"
                  />

                  {option}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { Filters };
