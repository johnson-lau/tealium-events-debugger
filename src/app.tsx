import { useCallback, useEffect, useState } from "react";
import { Events } from "./components/events/events";
import { NavBar } from "./components/nav-bar/nav-bar";
import type { Log } from "./lib/events";
import { parsePayload } from "./lib/events";
import sampleData from "./lib/sample-data";

function App() {
  const isChromeExtension = !!chrome.runtime;

  const [logs, setLogs] = useState<Log[]>([]);

  //Handles tealium-event messages sent from service-worker. These are sent
  //upon matching network requests.
  const handleMessage = useCallback(
    ({
      name,
      data,
    }: {
      name: string;
      data: chrome.webRequest.WebRequestBodyDetails;
    }) => {
      if (name === "tealium-event") {
        const payload = data.requestBody?.formData?.data ?? [];
        if (payload.length > 0) {
          const data = parsePayload(payload[0]);
          if (data) {
            setLogs([data, ...logs]);
          }
        }
      }
    },
    [logs, setLogs]
  );

  const handleClearLogs = () => {
    setLogs([]);
  };

  const handleAddSample = () => {
    const data = parsePayload(sampleData);
    if (!data) {
      return;
    }
    data.payload.post_time = Date.now();
    setLogs([data, ...logs]);
  };

  useEffect(() => {
    if (isChromeExtension) {
      chrome.runtime.onMessage.addListener(handleMessage);
    }
    return () => {
      if (isChromeExtension) {
        chrome.runtime.onMessage.removeListener(handleMessage);
      }
    };
  }, [isChromeExtension, handleMessage]);

  return (
    <>
      <NavBar
        onClear={handleClearLogs}
        onAdd={handleAddSample}
        showAddSample={!isChromeExtension}
      />

      <Events logs={logs} />
    </>
  );
}

export default App;
