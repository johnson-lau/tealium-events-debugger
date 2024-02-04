import { faLink } from "@fortawesome/free-solid-svg-icons";
import { JSONTree } from "react-json-tree";
import type { Log } from "../../lib/events";
import { IconButton } from "../icon-button/icon-button";
import classes from "./event.module.css";
import theme from "./theme";

type EventProps = {
  data: Log;
};

function Event({ data }: EventProps) {
  const timestamp = new Date(data.payload.post_time ?? Date.now());

  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data.payload, null, 2));
  };

  return (
    <div className={classes.event}>
      <div className={classes.eventTimestamp}>
        {timestamp.toISOString()}
        <IconButton
          className={classes.copyButton}
          icon={faLink}
          size="sm"
          onClick={handleCopyClipboard}
          title="Copy JSON"
        />
      </div>

      <JSONTree
        data={data}
        theme={{
          extend: theme,
          tree: classes.tree,
        }}
        invertTheme={true}
        hideRoot={true}
        shouldExpandNodeInitially={(keyPath) => {
          if (keyPath.includes("payload")) {
            return keyPath[0] === "data";
          }
          return true;
        }}
      />
    </div>
  );
}

export { Event };
