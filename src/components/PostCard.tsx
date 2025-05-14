import React from "react";
import { Post } from "@/types/sanity";
import Link from "next/link";
import CategoryChip from "./CategoryChip";
import { PostDate } from "./PostDate";
import Image from "next/image";
import { client } from "@/sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";

interface PstCardProps {
  post: Post;
}

const PstCard: React.FC<PstCardProps> = ({ post }) => {
  const { title, slug, categories, publishedAt } = post; // Extract the title from the post object
  const postSlug = slug?.current;

  const { projectId, dataset } = client.config();
  const urlFor = (source: SanityImageSource) =>
    projectId && dataset
      ? imageUrlBuilder({ projectId, dataset }).image(source)
      : null;

  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;

  return (
    <li className="w-52 min-h-52 rounded-2xl transition-transform transform hover:scale-105 relative overflow-hidden bg-background p-2 border-2 border-l-brass border-r-brass-dark border-t-brass border-b-brass-dark">
      <div className="w-full h-full flex flex-col items-center justify-between p-2">
        {postImageUrl && (
          <Image
            src={postImageUrl}
            alt={post.title}
            className="aspect-video rounded-xl mb-2"
            width={550}
            height={310}
            priority
            style={{ width: "auto", height: "auto" }}
          />
        )}
        <Link
          href={`/posts/${postSlug}`}
          className="hover:text-blue-600 transition-colors mb-2"
        >
          <p
            className="w-44 text-md text-sm font-bold text-white text-shadow overflow-hidden whitespace-nowrap text-ellipsis"
            title={title}
          >
            {title}
          </p>
        </Link>
        <PostDate
          className="text-brass mb-2"
          date={publishedAt}
          dateFormat="MM/DD/YYYY"
          size="sm"
        />
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <CategoryChip key={category._id} category={category} />
            ))}
          </div>
        )}
      </div>
    </li>
  );
};

export default PstCard;
