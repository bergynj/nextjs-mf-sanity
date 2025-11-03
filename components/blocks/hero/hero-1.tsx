import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { stegaClean } from "next-sanity";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { PAGE_QUERYResult } from "@/sanity.types";
import { cn } from "@/lib/utils";
import { container } from "@/styles/utils.css";
import * as heroStyles from "@/styles/blocks.css";

type Hero1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "hero-1" }
>;

export default function Hero1({
  tagLine,
  title,
  body,
  image,
  links,
}: Hero1Props) {
  return (
    <div className={cn(container, heroStyles.hero.container)}>
      <div className={heroStyles.hero.grid}>
        <div className={heroStyles.hero.flexCol}>
          {tagLine && (
            <h1 className={cn(heroStyles.hero.tagline, heroStyles.fadeUpAnimation, heroStyles.animationDelay[100])}>
              <span className={heroStyles.hero.taglineText}>{tagLine}</span>
            </h1>
          )}
          {title && (
            <h2 className={cn(heroStyles.hero.title, heroStyles.fadeUpAnimation, heroStyles.animationDelay[200])}>
              {title}
            </h2>
          )}
          {body && (
            <div className={cn(heroStyles.hero.body, heroStyles.fadeUpAnimation, heroStyles.animationDelay[300])}>
              <PortableTextRenderer value={body} />
            </div>
          )}
          {links && links.length > 0 && (
            <div className={cn(heroStyles.hero.links, heroStyles.fadeUpAnimation, heroStyles.animationDelay[400])}>
              {links.map((link) => (
                <Button
                  key={link.title}
                  variant={stegaClean(link?.buttonVariant)}
                  asChild
                >
                  <Link
                    href={link.href || "#"}
                    target={link.target ? "_blank" : undefined}
                    rel={link.target ? "noopener" : undefined}
                  >
                    {link.title}
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </div>
        <div className={heroStyles.hero.flexCol}>
          {image && image.asset?._id && (
            <Image
              className={cn(heroStyles.hero.image, heroStyles.fadeUpAnimation, heroStyles.animationDelay[500])}
              src={urlFor(image).url()}
              alt={image.alt || ""}
              width={image.asset?.metadata?.dimensions?.width || 800}
              height={image.asset?.metadata?.dimensions?.height || 800}
              placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
              blurDataURL={image?.asset?.metadata?.lqip || ""}
              quality={100}
            />
          )}
        </div>
      </div>
    </div>
  );
}
