import { faAdd, faBan } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "../icon-button/icon-button";
import classes from "./nav-bar.module.css";

type NavBarProps = {
  onClear: () => void;
  onAdd: () => void;
  showAddSample?: boolean;
};

function NavBar({ onClear, onAdd, showAddSample }: NavBarProps) {
  return (
    <nav className={classes.navbar}>
      {showAddSample && (
        <IconButton
          className={classes.button}
          onClick={onAdd}
          title="Add sample event"
          icon={faAdd}
          size="1x"
        />
      )}
      <IconButton
        className={classes.button}
        onClick={onClear}
        title="Clear events"
        icon={faBan}
        size="1x"
      />
    </nav>
  );
}

export { NavBar };
