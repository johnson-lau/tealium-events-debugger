import { useCallback, useEffect, useState } from "react";
import { Events } from "./components/events/events";
import { NavBar } from "./components/nav-bar/nav-bar";
import type { Log } from "./lib/events";
import { parsePayload } from "./lib/events";
import { FiltersProvider } from "./lib/filters-context/filters-context";
import { useFilters } from "./lib/filters-context/use-filters";
import sampleData from "./lib/sample-data";

function App() {
  const isChromeExtension = !!chrome.runtime;

  const { addFilterOptions } = useFilters();
  const [logs, setLogs] = useState<Log[]>([]);

  const addLog = useCallback(
    (data: Log | undefined) => {
      if (!data) {
        return;
      }

      setLogs([data, ...logs]);
      addFilterOptions(data);
    },
    [logs, addFilterOptions]
  );

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
          addLog(data);
        }
      }
    },
    [addLog]
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
    addLog(data);
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

function AppWithProviders() {
  return (
    <FiltersProvider defaultFilters={{ reg_user_id: true }}>
      <App />
    </FiltersProvider>
  );
}

export default AppWithProviders;
