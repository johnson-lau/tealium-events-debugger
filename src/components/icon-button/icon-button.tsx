import type { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./icon-button.module.css";

type IconButtonProps = {
  title?: string;
  onClick: () => void;
  size?: SizeProp | undefined;
  className?: string;
  icon: IconProp;
};

function IconButton({
  title,
  onClick,
  size,
  icon,
  className,
}: IconButtonProps) {
  return (
    <button
      className={`${classes.iconButton} ${className}`}
      title={title}
      onClick={onClick}
    >
      <FontAwesomeIcon size={size} icon={icon} />
    </button>
  );
}

export { IconButton };
