import { client } from "@/sanity/client";
import { type Post, type Category } from "@/types/sanity";
import PostCard from "@/components/PostCard";
import "@/app/general.css";
import Image from "next/image";
import { firaMono, parisienne } from "@/utils/fonts";

const NUMBER_OF_POSTS = 3;

const POSTS_QUERY = `*[
  _type == "post"
  && hidden != true
  && defined(slug.current)
]|order(publishedAt desc)[0...${NUMBER_OF_POSTS}]{
  _id,
  title,
  image,
  slug,
  publishedAt,
  body,
  "categories": *[_type == "category" && references(^._id) && title != "Hidden"]{
    _id,
    title,
    categorySlug
  }
}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const allCategories = await client.fetch(`
    *[_type == "category" && title != "Hidden"] {
      _id,
      title,
      categorySlug,
      "postIds": *[_type == "post" && references(^._id)]._id
    }
  `);

  const posts = await client.fetch<Post[]>(POSTS_QUERY, {}, options);

  const postCategoriesMap = new Map<string, Category[]>();
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
    <main className="container mx-auto max-w-3xl p-8">
      <div className="flex flex-col justify-center items-center">
        <h1
          className={`${parisienne.className} text-brass text-center text-7xl font-bold mb-4 mt-8 rnr-text-shadow`}
        >
          Rock n&#39; Runtime
        </h1>

        <h2 className="text-3xl mb-4 text-center rnr-text-shadow">
          Code Loud! Ship Hard! Rock On!
        </h2>

        <div
          className={`${firaMono.className} relative text-6xl font-bold text-white hover:text-gray-400 mb-16`}
        >
          <span className="text-green-400 text-2xl absolute left-10 top-16">
            &gt;rnr<span className="animate-blink">_</span>
          </span>
          <Image
            src="/guitar-pick-silhouette.svg"
            alt="Rock n' Runtime Logo"
            width={200}
            height={200}
            style={{height: 'auto'}}
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-3 text-center">Latest Posts</h2>

      <ul className="flex justify-between items-center">
        {posts.map((post) => {
          const postSlug = post.slug?.current;
          if (!postSlug) return null;
          return <PostCard key={post._id} post={post} />;
        })}
      </ul>
    </main>
  );
}
