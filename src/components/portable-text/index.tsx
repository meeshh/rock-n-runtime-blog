import React from "react";
import {
  PortableTextListComponent,
  PortableTextListItemComponent,
  PortableTextReactComponents,
} from "@portabletext/react";
import CodeBlock from "../CodeBlock";
import ImageComponent from "./ImageComponent";
import {
  NormalComponent,
  H1Component,
  H2Component,
  H3Component,
  H4Component,
  BlockquoteComponent,
} from "./BlockComponents";
import {
  BulletListComponent,
  NumberListComponent,
  BulletListItemComponent,
  NumberListItemComponent,
} from "./ListComponents";
import {
  StrongComponent,
  EmComponent,
  CodeMarkComponent,
} from "./MarkComponents";

interface CodeBlockValue {
  _type: "code";
  code: string;
  language: string;
}

export const portableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    code: ({ value }) => {
      const codeValue = value as unknown as CodeBlockValue;
      return <CodeBlock code={codeValue.code} language={codeValue.language} />;
    },
    image: ({ value }) => <ImageComponent value={value} />,
  },
  block: {
    normal: NormalComponent,
    h1: H1Component,
    h2: H2Component,
    h3: H3Component,
    h4: H4Component,
    blockquote: BlockquoteComponent,
  },
  list: {
    bullet: BulletListComponent as PortableTextListComponent,
    number: NumberListComponent as PortableTextListComponent,
  },
  listItem: {
    bullet: BulletListItemComponent as PortableTextListItemComponent,
    number: NumberListItemComponent as PortableTextListItemComponent,
  },
  marks: {
    strong: StrongComponent,
    em: EmComponent,
    code: CodeMarkComponent,
  },
};
