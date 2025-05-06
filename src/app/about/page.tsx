import { portableTextComponents } from "@/components/portable-text";
import { client } from "@/sanity/client"; // Import your Sanity client
import { Post } from "@/types/sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableText, PortableTextReactComponents } from "next-sanity";
import Image from "next/image";

const ABOUT_QUERY = `*[_type == "post" && title == "About Rock n' Runtime" && hidden == true][0] {
  _id,
  title,
  slug,
  body
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function AboutPage() {
  const post = await client.fetch<Post>(ABOUT_QUERY, { slug: "about" });

  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto max-w-3xl p-8 flex flex-col gap-4">
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
      {post.body && (
        <PortableText
          value={post.body}
          components={
            portableTextComponents as Partial<PortableTextReactComponents>
          }
        />
      )}
    </main>
  );
}
