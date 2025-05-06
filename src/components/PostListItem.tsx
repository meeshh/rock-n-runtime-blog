import { extractExcerpt } from "@/utils/postUtils";
import React from "react";
import CategoryChip from "./CategoryChip";
import { PostDate } from "./PostDate";
import Link from "next/link";
import { PortableTextBlock } from "@portabletext/react";
import { Post } from "@/types/sanity";

const PostListItem = ({ post }: { post: Post }) => {
  const postSlug = post.slug?.current;
  if (!postSlug) return null;

  return (
    <li key={post._id} className="py-3 rounded-md">
      <div className="flex flex-col gap-2">
        <Link
          href={`/posts/${postSlug}`}
          className="hover:text-blue-600 transition-colors"
        >
          <h2 className="text-xl font-semibold">{post.title}</h2>
        </Link>
        <p className="text-gray-400">
          {extractExcerpt(post.body as unknown as PortableTextBlock[])}
        </p>
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <CategoryChip key={category._id} category={category} />
            ))}
          </div>
        )}
        <PostDate date={post.publishedAt} />
      </div>
    </li>
  );
};

export default PostListItem;
