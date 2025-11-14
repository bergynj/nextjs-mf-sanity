import { SectionContainer } from "@schema-ui/ui";
import { stegaClean } from "next-sanity";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@schema-ui/ui";
import { PortableTextRenderer } from "@schema-ui/ui";
import { PAGE_QUERYResult } from "@schema-ui/sanity";

type FAQProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "faqs" }
>;

export default function FAQs({ padding, colorVariant, faqs }: FAQProps) {
  const color = stegaClean(colorVariant);
  return (
    <SectionContainer color={color} padding={padding}>
      {faqs && faqs?.length > 0 && (
        <Accordion className="space-y-4" type="multiple">
          {faqs.map((faq) => (
            <AccordionItem key={faq.title} value={`item-${faq._id}`}>
              <AccordionTrigger>{faq.title}</AccordionTrigger>
              <AccordionContent>
                <PortableTextRenderer value={faq.body || []} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </SectionContainer>
  );
}
