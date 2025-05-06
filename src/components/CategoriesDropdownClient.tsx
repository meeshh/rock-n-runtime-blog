"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Category = {
  _id: string;
  title: string;
  categorySlug: {
    current: string;
  };
};

export default function CategoriesDropdownClient({
  categories,
}: {
  categories: Category[];
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-col items-center">
        <span className="text-white mb-2">Categories</span>
        <button
          className={`handle 
            transition-transform 
            duration-700 
            ease-in-out 
            w-[50px] 
            h-[50px] 
            border-[3px] 
            border-brass-dark 
            rounded-full 
            relative
            before:content-[''] 
            before:absolute 
            before:top-[-8px] 
            before:left-[-8px] 
            before:w-[60px] 
            before:h-[60px] 
            before:bg-transparent 
            before:rounded-full 
            before:z-10 
            before:border-[4px] 
            before:border-background-200
            before:content-box
            after:content-['']
            after:absolute
            after:top-0
            after:left-[50%]
            after:transform after:-translate-x-1/2
            after:w-[3px]
            after:h-[20px]
            after:bg-background-200
            after:rounded-full
            ${isOpen ? "rotate-180" : "rotate-0"}`}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-fit bg-black border-8 shadow-white border-brass-dark rounded-md shadow-sm z-10"
        >
          <div className="p-2 flex flex-wrap gap-2">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/category/${category.categorySlug.current}`}
                  className="px-4 py-2 text-sm text-white hover:text-brass w-36 bg-background rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {category.title || "Unnamed Category"}
                </Link>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                No categories found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
