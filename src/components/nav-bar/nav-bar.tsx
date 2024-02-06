import { faAdd, faBan } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "../icon-button/icon-button";
import { Separator } from "../ui/separator";
import { Filters } from "./filters";
import classes from "./nav-bar.module.css";

type NavBarProps = {
  onClear: () => void;
  onAdd: () => void;
  showAddSample?: boolean;
};

function NavBar({ onClear, onAdd, showAddSample }: NavBarProps) {
  return (
    <nav className={classes.navbar}>
      <span>
        {showAddSample && (
          <IconButton
            className={classes.button}
            onClick={onAdd}
            title="Add sample event"
            icon={faAdd}
            size="1x"
          />
        )}
      </span>
      <span>
        <Filters />

        <Separator orientation="vertical" className="opacity-20" />

        <IconButton
          className={classes.button}
          onClick={onClear}
          title="Clear events"
          icon={faBan}
          size="lg"
        />
      </span>
    </nav>
  );
}

export { NavBar };
