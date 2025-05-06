import Link from "next/link";
import { type Tag } from "@/types/sanity";

interface TagChipProps {
  tag: Tag;
  isCurrentTag?: boolean;
}

export function TagChip({ tag }: TagChipProps) {
  return (
    <Link
      href={`/tag/${tag.slug.current}`}
      className="inline-block px-2 py-1 text-xs rounded-full hover:opacity-80 transition-opacity bg-gray-100 text-gray-700"
    >
      #{tag.title}
    </Link>
  );
}
