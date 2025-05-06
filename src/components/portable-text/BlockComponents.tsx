import { PortableTextComponentProps } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";

interface BlockComponentProps extends PortableTextComponentProps<PortableTextBlock> {
  children?: React.ReactNode;
}

export const H1Component = ({ children }: BlockComponentProps) => (
  <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
);

export const H2Component = ({ children }: BlockComponentProps) => (
  <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>
);

export const H3Component = ({ children }: BlockComponentProps) => (
  <h3 className="text-xl font-bold mt-5 mb-2">{children}</h3>
);

export const H4Component = ({ children }: BlockComponentProps) => (
  <h4 className="text-lg font-bold mt-4 mb-2">{children}</h4>
);

export const NormalComponent = ({ children }: BlockComponentProps) => (
  <p className="mb-4 leading-relaxed">{children}</p>
);

export const BlockquoteComponent = ({ children }: BlockComponentProps) => (
  <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
    {children}
  </blockquote>
); 