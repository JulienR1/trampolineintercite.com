import Image from "next/image";
import { CSSProperties } from "react";

interface IProps {
  label: string;
  websiteUrl: string;
  img: string;
  size: { width: number; height: number };
}

export function Partner({ label, websiteUrl, img, size }: IProps) {
  const aspectRatio = size.width / size.height;

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
          <Image src={img} alt={label} layout={"fill"} objectFit={"contain"} />
        </figure>
      </a>
    </div>
  );
}
