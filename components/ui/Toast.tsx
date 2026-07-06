"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error";

type ToastProps = {
  message: string;
  type: ToastType;
  visible: boolean;
  onDismiss: () => void;
};

export default function Toast({ message, type, visible, onDismiss }: ToastProps): JSX.Element {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "glass-panel-strong fixed bottom-6 left-1/2 z-50 flex max-w-sm -translate-x-1/2 items-center gap-3 rounded-2xl px-5 py-4",
            "border border-[var(--glass-border-strong)]"
          )}
        >
          {type === "success" ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-foreground" strokeWidth={1.5} />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0 text-foreground" strokeWidth={1.5} />
          )}
          <p className="flex-1 text-body-sm text-foreground">{message}</p>
          <button
            type="button"
            onClick={onDismiss}
            className="font-mono text-caption uppercase tracking-wider text-foreground-muted hover:text-foreground"
          >
            Dismiss
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
