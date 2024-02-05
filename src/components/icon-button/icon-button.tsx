import type { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./icon-button.module.css";
import React from "react";

type IconButtonProps = {
  title?: string;
  onClick: () => void;
  size?: SizeProp | undefined;
  className?: string;
  icon: IconProp;
};

type Ref = HTMLButtonElement;

const IconButton = React.forwardRef<
  Ref,
  React.PropsWithChildren<IconButtonProps>
>(function IconButton(
  { children, title, onClick, size, icon, className },
  ref
) {
  return (
    <button
      ref={ref}
      className={`${classes.iconButton} ${className}`}
      title={title}
      onClick={onClick}
    >
      <FontAwesomeIcon size={size} icon={icon} />

      {children}
    </button>
  );
});

export { IconButton };
