import Handlebars from 'handlebars';
import { v4 as id } from 'uuid';
import inputTemplate from './input.tmpl';
import { Block } from '../../utils/Block';
import { TInput } from '../../utils/types';
import './input.scss';

export class Input extends Block {
  constructor(context: TInput, events = {}) {
    super('div', {
      context: {
        ...context,
        disabledInput: context.disabled,
        inputContainerClassName: `${context.isProfileInput} input-profile__container input__container ${context.inputContainerClassName}`,
        inputClassName: `${context.isProfileInput} input-profile__input input ${context.inputClassName}`,
        id: id(),
      },
      template: inputTemplate,
      events,
    });
  }
}
