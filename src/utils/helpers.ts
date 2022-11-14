export const showModal = async (formId: string) => {
  const form = document.getElementById(formId);
  if (form?.classList.contains('hidden')) {
    form?.classList.remove('hidden');
  }
};

export const closeModal = (formId: string, inputClassName: string) => {
  const input = document.querySelector(inputClassName) as HTMLInputElement;
  const form = document.getElementById(formId);
  if (input) {
    input.value = '';
  }
  form?.classList.add('hidden');
};