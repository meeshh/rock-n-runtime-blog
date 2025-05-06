import { type SanityDocument } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Category extends SanityDocument {
  _id: string;
  title: string;
  description?: string;
  categorySlug: {
    current: string;
  };
}

export interface Tag extends SanityDocument {
  _id: string;
  title: string;
  slug: { current: string };
}

export interface Post extends SanityDocument {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  image?: SanityImageSource;
  categories: Category[];
  body?: Array<{
    _type: string;
    [key: string]: unknown;
  }>;
}

export interface SocialLink extends SanityDocument {
  _id: string;
  title: string;
  url: string;
  key: {
    current: string;
  };
}
