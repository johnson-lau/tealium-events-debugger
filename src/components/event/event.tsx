/* eslint-disable @typescript-eslint/no-explicit-any */
import { faCheck, faLink } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";
import { JSONTree } from "react-json-tree";
import type { Log } from "../../lib/events";
import { IconButton } from "../icon-button/icon-button";
import classes from "./event.module.css";
import theme from "./theme";
import { useFilters } from "@/lib/filters-context/use-filters";

type EventProps = {
  data: Log;
};

function Event({ data }: EventProps) {
  const { selectedFilters } = useFilters();
  const timestamp = new Date(data.payload.post_time ?? Date.now());
  const [copied, setCopied] = useState(false);

  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data.payload, null, 2));

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const filteredData = useMemo(() => {
    const result: Log = { ...data, summary: {} };
    selectedFilters.forEach((k) => {
      if ("data" in result.payload) {
        result.summary[k] = (result.payload.data as Record<string, any>)[k];
      }
    });
    return result;
  }, [selectedFilters, data]);

  return (
    <div className={classes.event}>
      <div className={classes.eventTimestamp}>
        {timestamp.toISOString()}
        <IconButton
          className={`${classes.copyButton} w-0 mx-1`}
          icon={copied ? faCheck : faLink}
          size="sm"
          onClick={handleCopyClipboard}
          title="Copy JSON"
        />
      </div>

      <JSONTree
        data={filteredData}
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
