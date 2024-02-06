import { AnimatePresence, motion } from "framer-motion";
import type { Log } from "../../lib/events";
import { Suspense, lazy } from "react";

// import { Event } from "../event/event";
const Event = lazy(() => import("../event/event"));

type EventsProps = {
  logs: Log[];
};

export function Events({ logs }: EventsProps) {
  return (
    <AnimatePresence initial={false}>
      {logs.map((log) => (
        <motion.div key={log?.payload?.post_time} layout="position">
          <Suspense fallback={<></>}>
            <Event data={log} />
          </Suspense>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
