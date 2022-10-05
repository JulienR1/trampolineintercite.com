import { IImage } from "@trampo/models";
import Image from "next/image";
import { CSSProperties } from "react";

interface IProps {
  label: string;
  websiteUrl: string;
  img: IImage;
}

export function Partner({ label, websiteUrl, img }: IProps) {
  const aspectRatio = img.width / img.height;

  return (
    <div className="partner" title={label}>
      <a
        href={websiteUrl}
        className="partner__link"
        aria-label={label}
        tabIndex={0}>
        <figure
          className="partner__figure"
          style={{ "--aspect-ratio": aspectRatio } as CSSProperties}>
          <Image
            src={img.src}
            alt={label ?? img.alt}
            layout={"fill"}
            objectFit={"contain"}
          />
        </figure>
      </a>
    </div>
  );
}
