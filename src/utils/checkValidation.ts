import { Dictionary } from './types';

const showError = (input: HTMLInputElement, isError: boolean) => {
  const parent = input.parentNode || input.parentElement;
  const messageElement = parent && (parent.querySelector('.error-message'));

  if (messageElement) {
    if (isError) {
      messageElement.classList.remove('hidden');
    } else {
      messageElement.classList.add('hidden');
    }
  }
};

const checkLoginInput = (input: HTMLInputElement): boolean => {
  let isError = false;
  if (input) {
    const { value } = input;
    isError = !value.match(/^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/);
    showError(input, isError);
  }
  return isError;
};

const checkPasswordInput = (input: HTMLInputElement): boolean => {
  let isError = false;
  if (input) {
    const { value } = input;
    isError = !value.match(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/);
    showError(input, isError);
  }
  return isError;
};

const checkMailInput = (input: HTMLInputElement): boolean => {
  let isError = false;
  if (input) {
    const { value } = input;
    isError = !value.match(/^[\w\d.-]*@[\w\d.-]*$/);
    showError(input, isError);
  }
  return isError;
};

const checkNameInput = (input: HTMLInputElement): boolean => {
  let isError = false;
  if (input) {
    const { value } = input;
    isError = !value.match(/^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/);
    showError(input, isError);
  }
  return isError;
};

const checkPhoneInput = (input: HTMLInputElement): boolean => {
  let isError = false;
  if (input) {
    const { value } = input;
    isError = !value.match(/^((\+7|7|8)+([0-9]){10,15})$/);
    showError(input, isError);
  }
  return isError;
};

export const checkValidation = (data: {event?: Event | null, input?: HTMLInputElement}): boolean => {
  const input = data.event?.target as HTMLInputElement || data.input;
  const type = input.getAttribute('data-type') || 'text';

  switch (type) {
    case 'login':
      return checkLoginInput(input);
    case 'password':
      return checkPasswordInput(input);
    case 'email':
      return checkMailInput(input);
    case 'name':
      return checkNameInput(input);
    case 'phone':
      return checkPhoneInput(input);
    default:
      return false;
  }
};

const getFormModel = (form: HTMLFormElement): Dictionary => {
  const inputs = form.querySelectorAll('input');

  if (!inputs || inputs?.length === 0) {
    return {};
  }

  const data: Dictionary = [...inputs].reduce((model: Dictionary, input: HTMLInputElement) => {
    const { name, value } = input;
    model[name] = value;
    return model;
  }, {});

  console.log(data);
  return data;
};

const checkAllInputs = (form: HTMLFormElement) => {
  const inputs = form.querySelectorAll('input');
  return [...inputs].map((input) => checkValidation({ input })).every((isError) => isError === false);
};

export const checkAllForm = async (event: Event, controller?: any, method?: string) => {
  const form = event.target as HTMLFormElement;
  if (form && checkAllInputs(form)) {
    const data = getFormModel(form);
    if (method) {
      const isError = await controller[method](data);
      return isError;
    }
  }
};
