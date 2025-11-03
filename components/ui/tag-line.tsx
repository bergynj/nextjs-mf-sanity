import { cn } from "@/lib/utils";
import { tagLine } from "./tag-line.css";

export default function TagLine({
  title,
  element = "div",
  className,
}: {
  title: string;
  element?: "div" | "h1" | "h2" | "h3";
  className?: string;
  large?: boolean;
}) {
  const TagElement = element;

  return (
    <TagElement className={cn(tagLine, className)}>
      {title}
    </TagElement>
  );
}
