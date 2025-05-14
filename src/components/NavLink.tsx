import Link from "next/link";
import "./Navbar.css";

type NavLinkProps = {
  href: string;
  text: string;
  isActive?: boolean;
};

const NavLink = ({ href, text, isActive = false }: NavLinkProps) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-white mb-2">{text}</span>
      <Link href={href}>
        <div
          className={`handle w-[50px] h-[50px] rounded-full relative border-[3px] border-brass-dark
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
            before:content-box
            before:border-${isActive ? "red-500" : "background-200"}`}
        >
          <span className="sr-only">Go to {href}</span>
        </div>
      </Link>
    </div>
  );
};

export default NavLink;
