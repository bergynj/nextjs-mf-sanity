import { SectionContainer } from "@schema-ui/ui";
import { stegaClean } from "next-sanity";
import Timeline1 from "./timeline-1";
import { PAGE_QUERYResult, ColorVariant } from "@schema-ui/sanity";

type TimelineRow = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "timeline-row" }
>;

export default function TimelineRow({
  padding,
  colorVariant,
  timelines,
}: TimelineRow) {
  const color = stegaClean(colorVariant) as ColorVariant;

  return (
    <SectionContainer color={color} padding={padding}>
      {timelines && timelines?.length > 0 && (
        <div className="max-w-[48rem] mx-auto">
          {timelines?.map((timeline, index) => (
            <Timeline1
              key={index}
              color={color}
              tagLine={timeline.tagLine}
              title={timeline.title}
              body={timeline.body}
            />
          ))}
        </div>
      )}
    </SectionContainer>
  );
}
