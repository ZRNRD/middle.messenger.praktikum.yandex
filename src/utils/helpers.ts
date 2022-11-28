import { TRequestData } from './types';

export const showModal = async (formId: string) => {
  const form = document.getElementById(formId);
  if (form?.classList.contains('hidden')) {
    form?.classList.remove('hidden');
  }
};

export const closeModal = (formId: string, inputClassName?: string) => {
  let input = null;
  const form = document.getElementById(formId);
  if (inputClassName) {
    input = document.querySelector(inputClassName) as HTMLInputElement;
  }
  if (input) {
    input.value = '';
  }
  form?.classList.add('hidden');
};

export const toggleModal = async (selector: string) => {
  const form = document.querySelector(selector);
  form?.classList.toggle('hidden');
};

export const getAvatar = (url: string):string => {
  return url ? `https://ya-praktikum.tech/api/v2/resources${url}` : url;
};

export function queryStringify(data: TRequestData) {
  if (!data) return '';
  return Object.entries(data).reduce((acc, [key, value], index, arr) => {
    return `${acc}${key}=${value}${index < arr.length - 1 ? '&' : ''}`;
  }, '?');
}
