import Handlebars from 'handlebars';
import inputTemplate from './input.tmpl';
import './input.scss';

export function Input(props) {
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
}
