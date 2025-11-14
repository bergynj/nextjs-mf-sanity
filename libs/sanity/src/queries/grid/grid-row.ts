import { groq } from "next-sanity";
import { gridCardQuery } from "./grid-card";
import { pricingCardQuery } from "./pricing-card";
import { gridPostQuery } from "./grid-post";

// @sanity-typegen-ignore
export const gridRowQuery = groq`
  _type == "grid-row" => {
    _type,
    _key,
    padding,
    colorVariant,
    gridColumns,
    columns[]{
      ${gridCardQuery},
      ${pricingCardQuery},
      ${gridPostQuery},
    },
  }
`;
