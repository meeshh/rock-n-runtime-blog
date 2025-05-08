import { client } from "@/sanity/client";
import { type Post, type Category } from "@/types/sanity";
import PostListItem from "@/components/PostListItem";
import Pagination from "@/components/Pagination";
import { POSTS_PER_PAGE } from "@/utils/postUtils";

export default async function IndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam as string) || 1;

  const allPosts = await client.fetch<Post[]>(
    `*[_type == "post" && hidden != true]`
  );
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const POSTS_QUERY = `*[
    _type == "post"
    && hidden != true
    && defined(slug.current)
  ]|order(publishedAt desc)[${(page - 1) * POSTS_PER_PAGE}...${
    page * POSTS_PER_PAGE
  }]{
    _id,
    title,
    slug,
    publishedAt,
    body,
    "categories": *[_type == "category" && references(^._id) && hidden != true]{
      _id,
      title,
      categorySlug
    }
  }`;

  const posts = await client.fetch<Post[]>(POSTS_QUERY);

  const postCategoriesMap = new Map<string, Category[]>();
  const allCategories = await client.fetch(`
    *[_type == "category" && hidden != true] {
      _id,
      title,
      categorySlug,
      "postIds": *[_type == "post" && references(^._id)]._id
    }
  `);

  allCategories.forEach((category: Category) => {
    category.postIds.forEach((postId: string) => {
      if (!postCategoriesMap.has(postId)) {
        postCategoriesMap.set(postId, []);
      }
      postCategoriesMap.get(postId)?.push({ ...category });
    });
  });

  posts.forEach((post) => {
    post.categories = postCategoriesMap.get(post._id) || [];
  });

  return (
    <main className="container mx-auto max-w-3xl p-8  bg-black bg-opacity-80 rounded-2xl">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>

      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => {
          const postSlug = post.slug?.current;
          if (!postSlug) return null;

          return <PostListItem key={post._id} post={post} />;
        })}
      </ul>

      <Pagination currentPage={page} totalPages={totalPages} />
    </main>
  );
}
