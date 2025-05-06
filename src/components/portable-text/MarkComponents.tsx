import { PortableTextMarkComponentProps } from "@portabletext/react";

interface LinkMarkProps {
  children: React.ReactNode;
  value?: {
    href?: string;
  };
}

export function LinkComponent({ children, value }: LinkMarkProps) {
  const target = (value?.href || "").startsWith("http")
    ? "_blank"
    : undefined;
  return (
    <a
      href={value?.href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className="text-blue-600 hover:underline"
    >
      {children}
    </a>
  );
}

export function StrongComponent(props: PortableTextMarkComponentProps) {
  return <strong className="font-bold">{props.children}</strong>;
}

export function EmComponent(props: PortableTextMarkComponentProps) {
  return <em className="italic">{props.children}</em>;
}

export function CodeMarkComponent(props: PortableTextMarkComponentProps) {
  return (
    <code className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-1.5 py-0.5 font-mono text-sm">
      {props.children}
    </code>
  );
} 