"use client";

import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type BaseProps = {
  label: string;
  error?: string;
  className?: string;
};

type InputProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & { multiline?: false };

type TextareaProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline: true };

export default function FloatingInput(props: InputProps | TextareaProps): JSX.Element {
  const { label, error, className, multiline, ...rest } = props;
  const id = useId();
  const hasError = Boolean(error);

  const fieldClasses = cn(
    "peer w-full rounded-2xl border bg-surface-secondary px-4 pb-2.5 pt-6 text-body-sm text-foreground outline-none transition-all duration-200",
    "border-[var(--glass-border)] placeholder-transparent",
    "focus:neu-pressed focus:border-[var(--glass-border-strong)]",
    hasError && "border-foreground/30 font-medium underline decoration-foreground/40 decoration-2 underline-offset-4",
    className
  );

  const labelClasses = cn(
    "pointer-events-none absolute left-4 top-4 origin-left font-mono text-caption uppercase tracking-[0.14em] transition-all duration-200",
    "peer-placeholder-shown:top-4 peer-placeholder-shown:text-foreground-subtle",
    "peer-focus:top-2 peer-focus:scale-[0.85] peer-focus:text-foreground-muted",
    "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-[0.85] peer-[:not(:placeholder-shown)]:text-foreground-muted",
    hasError && "text-foreground font-semibold"
  );

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          id={id}
          placeholder=" "
          rows={(rest as TextareaProps).rows ?? 5}
          className={cn(fieldClasses, "resize-none")}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input id={id} placeholder=" " className={fieldClasses} {...(rest as InputHTMLAttributes<HTMLInputElement>)} />
      )}
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      {hasError && (
        <p className="mt-2 flex items-center gap-1.5 text-caption font-medium text-foreground">
          <AlertCircle className="h-3.5 w-3.5 shrink-0 opacity-70" strokeWidth={2} />
          {error}
        </p>
      )}
    </div>
  );
}
