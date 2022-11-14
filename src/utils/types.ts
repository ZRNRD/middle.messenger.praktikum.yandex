export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export type Dictionary = Record<string, any>;

export type TBlockProps = {
  context?: Dictionary;
  template?: string;
  events?: {[event: string]: any};
} & Record<string, any>;

export type TMetaBlock = {
  tagName: string;
  props: Dictionary;
  className?: string;
}

export type TButton = {
  title: string;
  className?: string;
  content?: string;
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
  inputs?: Dictionary[],
  button?: Dictionary,
  content?: string,
}

export type TChatPage = {
  isChatSelected?: boolean;
  content?: string;
}

export type Options = {
  method?: METHODS;
  data?: any;
  headers?: Record<string, string>;
  contentType?: string;
}
