import { client } from "@/sanity/client";
import { Post, Tag } from "@/types/sanity";

export async function enrichPostWithTags(
  post: Post
): Promise<Post & { tags: Tag[] }> {
  const allTags = await client.fetch(`
      *[_type == "tag"] {
        _id,
        title,
        slug,
        "postIds": *[_type == "post" && references(^._id)]._id
      }
    `);

  const postTagsMap = new Map<string, Tag[]>();
  
  allTags.forEach((tag: Tag) => {
    tag.postIds.forEach((postId: string) => {
      if (!postTagsMap.has(postId)) {
        postTagsMap.set(postId, []);
      }
      postTagsMap.get(postId)?.push({ ...tag });
    });
  });

  return {
    ...post,
    tags: postTagsMap.get(post._id) || [],
  };
}
