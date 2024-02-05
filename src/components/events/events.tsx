import { AnimatePresence, motion } from "framer-motion";
import type { Log } from "../../lib/events";
import { Event } from "../event/event";

type EventsProps = {
  logs: Log[];
};

export function Events({ logs }: EventsProps) {
  return (
    <AnimatePresence initial={false}>
      {logs.map((log) => (
        <motion.div key={log?.payload?.post_time} layout="position">
          <Event data={log} />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
