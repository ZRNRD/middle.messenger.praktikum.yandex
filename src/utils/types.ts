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
  title?: string;
  isLink?: boolean;
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
  inputs?: Dictionary | Dictionary[],
  buttons?: Dictionary | Dictionary[],
  className?: string;
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

export type TWebSocketParams = {
  userId: number,
  chatId: number,
  token: string,
};

export type TRequestData = Record<string, string | number | Dictionary> | undefined;
