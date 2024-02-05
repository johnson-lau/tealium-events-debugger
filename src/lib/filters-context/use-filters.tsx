import { useContext } from "react";
import { FiltersContext } from "./filters-context";

function useFilters() {
  const filterValues = useContext(FiltersContext);
  return filterValues;
}

export { useFilters };
