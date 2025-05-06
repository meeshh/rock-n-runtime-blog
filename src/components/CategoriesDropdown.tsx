import { client } from "@/sanity/client";
import CategoriesDropdownClient from "./CategoriesDropdownClient";

export default async function CategoriesDropdown() {
  // Fetch categories with explicit field selection and hidden filter
  const categories = await client.fetch(`
    *[_type == "category" && hidden != true] {
      _id,
      title,
      categorySlug
    }
  `);

  return <CategoriesDropdownClient categories={categories} />;
}
