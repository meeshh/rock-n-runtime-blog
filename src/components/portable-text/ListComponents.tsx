import { PortableTextComponentProps } from "@portabletext/react";
import { PortableTextListItemBlock } from "@portabletext/types";

type ListComponentProps = PortableTextComponentProps<{
  _type: string;
  children: PortableTextListItemBlock[];
}>;
type ListItemComponentProps = PortableTextComponentProps<PortableTextListItemBlock>;

export function BulletListComponent(props: ListComponentProps) {
  return <ul className="list-disc pl-6 mb-4 space-y-1">{props.children}</ul>;
}

export function NumberListComponent(props: ListComponentProps) {
  return <ol className="list-decimal pl-6 mb-4 space-y-1">{props.children}</ol>;
}

export function BulletListItemComponent(props: ListItemComponentProps) {
  return <li className="mb-1">{props.children}</li>;
}

export function NumberListItemComponent(props: ListItemComponentProps) {
  return <li className="mb-1">{props.children}</li>;
} 