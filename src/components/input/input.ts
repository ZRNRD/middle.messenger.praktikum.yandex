import Handlebars from 'handlebars';
import inputTemplate from './input.tmpl';
import { Block } from '../../utils/Block';
import { TInput } from '../../utils/types';
import './input.scss';

/* export function Input(props) {
  const {
    required = false,
    value = null,
    disabled = false,
    inputContainerClassName,
    inputClassName,
  } = props;

  const template = Handlebars.compile(inputTemplate);

  const context = {
    ...props,
    required,
    value,
    disabledInput: disabled,
    inputContainerClassName: `input__container ${inputContainerClassName}`,
    inputClassName: `input ${inputClassName}`,
  };

  return template(context);
} */

export class Input extends Block {
  constructor(context: TInput, events = {}) {
    super('div', {
      context: {
        ...context,
        disabledInput: context.disabled,
        inputContainerClassName: `${context.isProfileInput} input-profile__container input__container ${context.inputContainerClassName}`,
        inputClassName: `${context.isProfileInput} input-profile__input input ${context.inputClassName}`,
      },
      template: inputTemplate,
      events,
    });
  }
}
