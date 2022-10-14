export type Dictionary = Record<string, any>;

export type TBlockProps = {
  context?: Dictionary;
  template?: string;
  events?: {[event: string]: any};
} & Record<string, any>;

export type TMetaBlock = {
  tagName: string;
  props: Dictionary;
}

export type TButton = {
  title: string;
  className?: string;
}
