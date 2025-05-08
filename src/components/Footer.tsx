import FooterLink, { withListItem } from "./SocialLink";
import { client } from "@/sanity/client";
import { type SocialLink as SocialLinkType } from "@/types/sanity";
import { parisienne } from "@/utils/fonts";
import { iconMap } from "@/utils/footerUtils";

const SOCIALLINKS_QUERY = `*[_type == "socialLink"]`;

const quickLinks = [
  {
    href: "/",
    label: "Home",
    target: "_self",
  },
  {
    href: "/blog",
    label: "Blog",
    target: "_self",
  },
  {
    href: "/about",
    label: "About",
    target: "_self",
  },
];

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = await client.fetch(SOCIALLINKS_QUERY);

  return (
    <footer className="bg-background py-6 mt-auto" aria-label="Site footer">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3
              className={`text-4xl font-bold mb-4 ${parisienne.className} text-brass`}
            >
              Rock n&apos; Runtime
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              A blog about tech, music, and everything in between.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(({ href, label, target }) => {
                const WrappedLink = withListItem(FooterLink);
                return (
                  <WrappedLink
                    key={href}
                    href={href}
                    label={label}
                    target={target}
                  />
                );
              })}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <ul className="space-y-2">
              {socialLinks.map((link: SocialLinkType) => {
                const WrappedSocialLink = withListItem(FooterLink);
                return (
                  <WrappedSocialLink
                    key={link._id}
                    href={link.url}
                    label={link.title}
                    icon={iconMap[link.key.current as keyof typeof iconMap]}
                  />
                );
              })}
            </ul>
          </div>
        </div>
        <div className="border-t mt-6 pt-6 text-center text-gray-500 dark:text-gray-400 border-brass">
          <p>© {currentYear} Rock n Runtime. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
