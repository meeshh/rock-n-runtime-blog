import Link from "next/link";
import { type Category } from "@/types/sanity";

interface CategoryChipProps {
  category: Category;
  isCurrentCategory?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function CategoryChip({
  category,
  isCurrentCategory = false,
  size = "sm",
}: CategoryChipProps) {
  if (category.categorySlug.current === "hidden") {
    return null;
  }

  let title = category.title;
  if (size === "sm") {
    title = category.title
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  }

  return (
    <Link
      title={category.title}
      href={`/category/${category.categorySlug.current}`}
      className={`inline-block px-2 py-1 rounded-full hover:opacity-80 transition-opacity ${
        size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"
      } ${
        isCurrentCategory
          ? "bg-blue-100 text-blue-700"
          : "bg-gray-100 text-gray-700"
      }`}
    >
      {title}
    </Link>
  );
}
