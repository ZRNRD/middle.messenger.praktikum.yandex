import { Dictionary } from "./types";

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

export const checkValidation = (data: {event?: Event | null, input?: HTMLInputElement}): boolean => {
  const input = data.event?.target as HTMLInputElement || data.input;
  const type = input.getAttribute('data-type') || 'text';

  switch (type) {
    case 'login':
      return checkLoginInput(input);
    case 'password':
      return checkPasswordInput(input);
    default:
      return false;
  }
};

const getFormModel = (form: HTMLFormElement) => {
  const inputs = form.querySelectorAll('input');

  if (!inputs || inputs?.length === 0) {
    return;
  }

  const data: Dictionary = [...inputs].reduce((model: Dictionary, input: HTMLInputElement) => {
    const { name, value } = input;
    model[name] = value;
    return model;
  }, {});

  console.log(data);
};

const checkAllInputs = (form: HTMLFormElement) => {
  const inputs = form.querySelectorAll('input');
  return [...inputs].map((input) => checkValidation({ input })).every((isError) => isError === false);
};

export const checkAllForm = (event: Event, nextRoute: string) => {
  const form = event.target as HTMLFormElement;
  if (form && checkAllInputs(form)) {
    getFormModel(form);
    if (nextRoute) window.location.href = nextRoute;
  }
};
