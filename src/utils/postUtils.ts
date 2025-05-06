import { PortableTextBlock } from "@portabletext/types";

export const POSTS_PER_PAGE = 6;

export const extractExcerpt = (
  body: PortableTextBlock[],
  maxLength: number = 175
): string => {
  const plainText = body
    .map((block) => {
      if (block._type === "block") {
        return block.children.map((child) => child.text).join("");
      }
      return "";
    })
    .join(" ");

  if (plainText.length <= maxLength) {
    return plainText;
  }

  const excerpt = plainText.substring(0, maxLength);
  const lastSpaceIndex = excerpt.lastIndexOf(" ");

  return lastSpaceIndex !== -1
    ? `${excerpt.substring(0, lastSpaceIndex)}...`
    : `${excerpt}...`;
};
