import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface ImageValue {
  _type: "image";
  asset: {
    _ref: string;
  };
  alt?: string;
  caption?: string;
}

interface ImageComponentProps {
  value: ImageValue;
}

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default function ImageComponent({ value }: ImageComponentProps) {
  if (!value?.asset?._ref) {
    return null;
  }

  const imageUrl = urlFor(value)?.width(800).height(450).url();

  if (!imageUrl) {
    return null;
  }

  return (
    <div className="my-6">
      <Image
        src={imageUrl}
        alt={value.alt || "Blog post image"}
        width={800}
        height={450}
        className="rounded-lg"
        style={{ width: "auto", height: "auto" }}
        priority
      />
      {value.caption && (
        <p className="text-sm text-gray-500 mt-2 text-center">
          {value.caption}
        </p>
      )}
    </div>
  );
}
