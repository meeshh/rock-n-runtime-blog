import CodeBlockComponent from './CodeBlockComponent';
import ImageComponent from './ImageComponent';
import {
  H1Component,
  H2Component,
  H3Component,
  H4Component,
  NormalComponent,
  BlockquoteComponent,
} from './BlockComponents';
import {
  BulletListComponent,
  NumberListComponent,
  BulletListItemComponent,
  NumberListItemComponent,
} from './ListComponents';
import {
  LinkComponent,
  StrongComponent,
  EmComponent,
  CodeMarkComponent,
} from './MarkComponents';

export const portableTextComponents = {
  types: {
    code: CodeBlockComponent,
    image: ImageComponent,
  },
  block: {
    h1: H1Component,
    h2: H2Component,
    h3: H3Component,
    h4: H4Component,
    normal: NormalComponent,
    blockquote: BlockquoteComponent,
  },
  list: {
    bullet: BulletListComponent,
    number: NumberListComponent,
  },
  listItem: {
    bullet: BulletListItemComponent,
    number: NumberListItemComponent,
  },
  marks: {
    link: LinkComponent,
    strong: StrongComponent,
    em: EmComponent,
    code: CodeMarkComponent,
  },
}; 