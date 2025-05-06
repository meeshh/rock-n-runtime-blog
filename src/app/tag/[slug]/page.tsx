import Link from "next/link";
import { client } from "@/sanity/client";
import { type Post, type Category, Tag } from "@/types/sanity";
import PostListItem from "@/components/PostListItem";
import Pagination from "@/components/Pagination";
import { POSTS_PER_PAGE } from "@/utils/postUtils";

const TAG_QUERY = `*[_type == "tag" && slug.current == $slug && hidden != true][0]{
  _id,
  title
}`;

const options = { next: { revalidate: 30 } };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: `Tag: ${slug}`,
  };
}

export default async function TagPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam as string) || 1;

  const tag = await client.fetch<Tag>(TAG_QUERY, { slug }, options);

  if (!tag) {
    return (
      <main className="container mx-auto max-w-3xl p-8">
        <h1 className="text-4xl font-bold mb-8">Tag Not Found</h1>
        <Link href="/" className="text-blue-500 hover:text-blue-400">
          Return to Home
        </Link>
      </main>
    );
  }

  const TAG_POSTS_QUERY = `*[
    _type == "post"
    && defined(slug.current)
    && hidden != true
    && references($tagId)
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

  const allCategories = await client.fetch(`
    *[_type == "category"] {
      _id,
      title,
      categorySlug,
      "postIds": *[_type == "post" && references(^._id)]._id
    }
  `);

  const posts = await client.fetch<Post[]>(
    TAG_POSTS_QUERY,
    { tagId: tag._id },
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

  const allPostsOfTag = await client.fetch<Post[]>(
    `*[
    _type == "post"
    && defined(slug.current)
    && hidden != true
    && references($tagId)
  ]`,
    { tagId: tag._id },
    options
  );

  const totalPosts = allPostsOfTag.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <main className="container mx-auto max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-4">#{tag.title}</h1>

      {posts.length > 0 ? (
        <ul className="flex flex-col gap-y-4">
          {posts.map((post) => {
            const postSlug = post.slug?.current;
            if (!postSlug) return null;

            return <PostListItem key={post._id} post={post} />;
          })}
        </ul>
      ) : (
        <p>No posts tagged with #{tag.title}.</p>
      )}
      <Pagination currentPage={page} totalPages={totalPages} />
    </main>
  );
}
