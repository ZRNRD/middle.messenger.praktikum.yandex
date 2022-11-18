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
