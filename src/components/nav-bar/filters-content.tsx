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
import { IconButton } from "../icon-button/icon-button";

function FiltersPopoverContent() {
  const { filterOptions, toggleFilter, isSelected } = useFilters();

  return (
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
  );
}

export default FiltersPopoverContent;
