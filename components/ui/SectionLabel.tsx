import { cn } from "@/lib/utils";

type SectionLabelProps = {
  index: string;
  title: string;
  kicker?: string;
  className?: string;
};

export default function SectionLabel({
  index,
  title,
  kicker,
  className
}: SectionLabelProps): JSX.Element {
  return (
    <div className={cn("mb-8 sm:mb-10", className)}>
      <p className="font-mono text-caption font-medium uppercase tracking-[0.28em] text-foreground-subtle">
        {kicker ? `// ${kicker}` : `// ${index}`}
      </p>
      <h2 className="mt-3 font-heading text-h2 text-foreground">
        {title}
      </h2>
    </div>
  );
}
