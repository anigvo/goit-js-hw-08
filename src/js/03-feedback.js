import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector(`.feedback-form`);

form.addEventListener(
  'input',
  throttle(onFormInput, 500, {
    trailing: false,
    leading: true,
  })
);

form.addEventListener(`submit`, onFormSubmit);

function onFormInput(event) {
  const formElements = {
    email: event.currentTarget.elements.email.value,
    message: event.currentTarget.elements.message.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formElements));
}
let currentInput = JSON.parse(localStorage.getItem(STORAGE_KEY));
if (currentInput) {
  form.elements.email.value = currentInput.email;
  form.elements.message.value = currentInput.message;
}

function onFormSubmit(event) {
  event.preventDefault();
  if (!form.elements.email.value || !form.elements.message.value) {
    window.alert(`Потрібно заповнити усі форми`)
    return;
  }
  
  form.elements.email.value = null;
  form.elements.message.value = null;
  localStorage.removeItem(STORAGE_KEY);
  const afterSubmitFormElements = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };
  console.log(afterSubmitFormElements);
}
