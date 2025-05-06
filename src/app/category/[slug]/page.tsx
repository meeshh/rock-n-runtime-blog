import Link from "next/link";
import { client } from "@/sanity/client";
import { type Post, type Category } from "@/types/sanity";
import PostListItem from "@/components/PostListItem";
import Pagination from "@/components/Pagination";
import { POSTS_PER_PAGE } from "@/utils/postUtils";

const CATEGORY_QUERY = `*[_type == "category" && categorySlug.current == $slug][0]{
  _id,
  title,
  description
}`;

const options = { next: { revalidate: 30 } };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: `Category: ${slug}`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam as string) || 1;

  const CATEGORY_POSTS_QUERY = `*[
    _type == "post"
    && defined(slug.current)
    && hidden != true
    && references($categoryId)
  ]|order(publishedAt desc)[${(page - 1) * POSTS_PER_PAGE}...${
    page * POSTS_PER_PAGE
  }]{
    _id,
    title,
    slug,
    publishedAt,
    body,
    "categories": *[_type == "category" && references(^._id)]{
      _id,
      title,
      categorySlug
    }
  }`;

  const category = await client.fetch<Category>(
    CATEGORY_QUERY,
    { slug },
    options
  );

  if (!category) {
    return (
      <main className="container mx-auto max-w-3xl p-8">
        <h1 className="text-4xl font-bold mb-8">Category Not Found</h1>
        <Link href="/" className="text-blue-500 hover:text-blue-400">
          Return to Home
        </Link>
      </main>
    );
  }

  const allCategories = await client.fetch(`
    *[_type == "category"] {
      _id,
      title,
      categorySlug,
      "postIds": *[_type == "post" && references(^._id)]._id
    }
  `);

  const posts = await client.fetch<Post[]>(
    CATEGORY_POSTS_QUERY,
    { categoryId: category._id },
    options
  );

  const postCategoriesMap = new Map<string, Category[]>();
  allCategories.forEach(
    (category: {
      _id: string;
      title: string;
      categorySlug: { current: string };
      postIds: string[];
    }) => {
      category.postIds.forEach((postId: string) => {
        if (!postCategoriesMap.has(postId)) {
          postCategoriesMap.set(postId, []);
        }
        postCategoriesMap.get(postId)?.push({
          _id: category._id,
          title: category.title,
          categorySlug: category.categorySlug,
        });
      });
    }
  );

  posts.forEach((post) => {
    post.categories = postCategoriesMap.get(post._id) || [];
  });

  const allPostsOfCategory = await client.fetch<Post[]>(
    `*[
    _type == "post"
    && defined(slug.current)
    && hidden != true
    && references($categoryId)
  ]`,
    { categoryId: category._id },
    options
  );

  const totalPosts = allPostsOfCategory.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <main className="container mx-auto max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-4">
        Posts in <span className="text-blue-500">{category.title}</span>
      </h1>
      {category.description && (
        <p className="text-gray-600 mb-8">{category.description}</p>
      )}
      {posts.length > 0 ? (
        <ul className="flex flex-col gap-y-4">
          {posts.map((post) => {
            const postSlug = post.slug?.current;
            if (!postSlug) return null;

            return <PostListItem key={post._id} post={post} />;
          })}
        </ul>
      ) : (
        <p>No posts found in this category.</p>
      )}
      <Pagination currentPage={page} totalPages={totalPages} />
    </main>
  );
}
