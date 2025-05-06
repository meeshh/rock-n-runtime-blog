import Link from "next/link";
import CategoriesDropdown from "./CategoriesDropdown";
import "./Navbar.css";
import Image from "next/image";
import NavLink from "./NavLink";
import { firaMono } from "@/utils/fonts";

export default function Navbar() {
  return (
    <nav className="shadow-sm bg-background">
      <div className="mx-auto px-4 py-3">
        <div className="flex justify-between items-center px-8">
          <div className="flex items-center relative">
            <Link
              href="/"
              className={`${firaMono.className} text-6xl font-bold text-white hover:text-gray-400`}
            >
              <span className="text-green-400 text-lg font-bold absolute left-6 top-7">
                &gt;rnr_
              </span>
              <Image
                src="/guitar-pick-silhouette.svg"
                alt="Rock n' Runtime Logo"
                width={100}
                height={100}
              />
            </Link>
          </div>
          <div className="flex space-x-10 items-center uppercase font-bold">
            <CategoriesDropdown />
            <NavLink href="/blog" text="Blog" />
            <div className="h-20 w-0.5 bg-brass-dark" />
            <NavLink href="/about" text="About" />
            <NavLink href="/contact" text="Contact" />
          </div>
        </div>
      </div>
    </nav>
  );
}
