import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { portableTextComponents } from "@/components/portable-text";
import { notFound } from "next/navigation";
import { type Post, type Category, Tag } from "@/types/sanity";
import CategoryChip from "@/components/CategoryChip";
import { PostDate } from "@/components/PostDate";
import { TagChip } from "@/components/TagChip";
import { Metadata } from "next";
import { enrichPostWithTags } from "@/app/about/tags";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  image,
  body[]{
    ...,
    _type == "code" => {
      _type,
      code,
      language
    }
  }
}`;

const CATEGORY_QUERY = `*[_type == "category" && categorySlug.current == $slug][0]{
  title
}`;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<Post>(POST_QUERY, { slug });

  if (!post) {
    return {
      title: "Post not found",
      description: "Sorry, the post you're looking for doesn't exist.",
    };
  }

  const enrichedPost = await enrichPostWithTags(post);

  const keywords = enrichedPost.tags.map((tag) => tag.title);

  const imageUrl = enrichedPost.image
    ? urlFor(enrichedPost.image)?.width(800).height(420).url()
    : undefined;

  const title = enrichedPost.title;
  const description = `Read about "${enrichedPost.title}" on our blog.`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/posts/${enrichedPost.slug.current}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const allCategories = await client.fetch(`
    *[_type == "category"] {
      _id,
      title,
      categorySlug,
      "postIds": *[_type == "post" && references(^._id)]._id
    }
  `);

  const post = await client.fetch<Post>(POST_QUERY, { slug });

  if (!post) {
    notFound();
  }

  // Create a map of post IDs to categories
  const postCategoriesMap = new Map<string, Category[]>();
  allCategories.forEach((category: Category) => {
    category.postIds.forEach((postId: string) => {
      if (!postCategoriesMap.has(postId)) {
        postCategoriesMap.set(postId, []);
      }
      postCategoriesMap.get(postId)?.push({ ...category });
    });
  });

  const enrichedPost = await enrichPostWithTags(post);
  post.tags = enrichedPost.tags;

  // Add categories to post
  post.categories = postCategoriesMap.get(post._id) || [];

  const headersList = await headers();
  const referer = headersList.get("referer") || "";
  const isFromCategory = referer.includes("/category/");
  const categorySlug = isFromCategory
    ? referer.split("/category/")[1]?.split("/")[0]
    : null;

  // Fetch category title if coming from a category page
  let categoryTitle = "category";
  if (isFromCategory && categorySlug) {
    const category = await client.fetch(
      CATEGORY_QUERY,
      { slug: categorySlug },
      options
    );
    if (category) {
      categoryTitle = category.title;
    }
  }

  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto max-w-3xl p-8 flex flex-col gap-4  bg-black bg-opacity-80 rounded-2xl">
      <Link
        href={
          isFromCategory && categorySlug ? `/category/${categorySlug}` : "/"
        }
        className="hover:underline"
      >
        ← Back to {isFromCategory ? categoryTitle : "home"}
      </Link>
      {postImageUrl && (
        <Image
          src={postImageUrl}
          alt={post.title}
          className="aspect-video rounded-xl"
          width={550}
          height={310}
          priority
          style={{ width: "auto", height: "auto" }}
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <div className="prose prose-lg max-w-none">
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category) => (
              <CategoryChip key={category._id} category={category} size="md" />
            ))}
          </div>
        )}
        <PostDate date={post.publishedAt} className="text-brass mb-6" />
        {post.body && (
          <PortableText
            value={post.body}
            components={
              portableTextComponents as Partial<PortableTextReactComponents>
            }
          />
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag: Tag) => (
              <TagChip key={tag._id} tag={tag} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
