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

export type TInput = {
  isProfileInput?: boolean;
  type: string;
  errorMessage?: string;
  label?: string;
  name: string;
  required?: boolean;
  value?: string | number;
  placeholder?: string;
  disabled?: boolean;
  inputContainerClassName?: string;
  inputClassName?: string;
  dataType?: string;
}

export type TForm = {
  children?: {
      inputs?: Dictionary[],
      button?: Dictionary,
  },
  content?: string,
}
