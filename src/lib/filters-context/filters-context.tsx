import { FilterOption } from "./filters-context";
import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Log } from "../events";

export type FilterOption = string;

type FiltersContextProps = {
  filterOptions: FilterOption[];
  selectedFilters: Set<FilterOption>;

  isSelected: (input: string) => boolean;
  addFilterOptions: (log: Log) => void;
  setFilterOptions: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedFilters: React.Dispatch<React.SetStateAction<Set<FilterOption>>>;
  toggleFilter: (input: string) => void;
};

export const FiltersContext = React.createContext<FiltersContextProps>({
  filterOptions: [],
  isSelected: () => false,
  selectedFilters: new Set(),
  addFilterOptions: () => {},
  setFilterOptions: () => {},
  setSelectedFilters: () => {},
  toggleFilter: () => {},
});

type FiltersProviderProps = {
  defaultFilters: Record<string, boolean>;
};

function FiltersProvider({
  defaultFilters,
  children,
}: PropsWithChildren<FiltersProviderProps>) {
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>(
    Object.keys(defaultFilters)
  );
  const [selectedFilters, setSelectedFilters] = useState<Set<FilterOption>>(
    new Set(
      Object.entries(defaultFilters).reduce<string[]>(
        (prev, [key, isSelected]) => {
          return [...prev, ...(isSelected ? [key] : [])];
        },
        []
      )
    )
  );

  const sortedOptions = useMemo(() => {
    return filterOptions.sort();
  }, [filterOptions]);

  const isSelected = useCallback(
    (input: string) => {
      return selectedFilters.has(input);
    },
    [selectedFilters]
  );

  const addFilterOptions = useCallback(
    function addFilterOptions(data: Log) {
      if (!("data" in data.payload)) {
        return;
      }

      const optionsSet = new Set(filterOptions);
      Object.keys(data.payload.data ?? {}).forEach((key) => {
        optionsSet.add(key);
      });
      setFilterOptions(Array.from(optionsSet));
    },
    [filterOptions, setFilterOptions]
  );

  const toggleFilter = useCallback(
    (input: string) => {
      if (selectedFilters.has(input)) {
        selectedFilters.delete(input);
        setSelectedFilters(new Set(selectedFilters));
        return;
      }

      setSelectedFilters((prev) => new Set(prev.add(input)));
    },
    [selectedFilters]
  );

  return (
    <FiltersContext.Provider
      value={{
        filterOptions: sortedOptions,
        isSelected,
        selectedFilters,
        addFilterOptions,
        setFilterOptions,
        setSelectedFilters,
        toggleFilter,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

export { FiltersProvider };
