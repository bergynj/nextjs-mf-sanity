import { PAGE_QUERYResult } from "@schema-ui/sanity";
import Hero1 from "./hero/hero-1";
import Hero2 from "./hero/hero-2";
import SectionHeader from "./section-header";
import SplitRow from "./split/split-row";
import GridRow from "./grid/grid-row";
import Carousel1 from "./carousel/carousel-1";
import Carousel2 from "./carousel/carousel-2";
import TimelineRow from "./timeline/timeline-row";
import Cta1 from "./cta/cta-1";
import LogoCloud1 from "./logo-cloud/logo-cloud-1";
import FAQs from "./faqs";
import FormNewsletter from "./forms/newsletter";
import AllPosts from "./all-posts";

type Block = NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number];

const componentMap: {
  [K in Block["_type"]]: React.ComponentType<Extract<Block, { _type: K }>>;
} = {
  "hero-1": Hero1,
  "hero-2": Hero2,
  "section-header": SectionHeader,
  "split-row": SplitRow,
  "grid-row": GridRow,
  "carousel-1": Carousel1,
  "carousel-2": Carousel2,
  "timeline-row": TimelineRow,
  "cta-1": Cta1,
  "logo-cloud-1": LogoCloud1,
  faqs: FAQs,
  "form-newsletter": FormNewsletter,
  "all-posts": AllPosts,
};

export default function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks?.map((block) => {
        const Component = componentMap[block._type];
        if (!Component) {
          // Fallback for development/debugging of new component types
          console.warn(
            `No component implemented for block type: ${block._type}`
          );
          return <div data-type={block._type} key={block._key} />;
        }
        return <Component {...(block as any)} key={block._key} />;
      })}
    </>
  );
}
