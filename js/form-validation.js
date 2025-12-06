// js/form-validation.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quiz-form");
  const successMsg = document.getElementById("form-success");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    let isValid = true;

    const childName = document.getElementById("childName");
    const parentEmail = document.getElementById("parentEmail");
    const childAge = document.getElementById("childAge");
    const favAnimal = document.getElementById("favAnimal");
    const difficultyInputs = document.querySelectorAll("input[name='difficulty']");
    const acceptTerms = document.getElementById("acceptTerms");

    if (!childName.value.trim() || childName.value.trim().length < 2) {
      showError(childName, "Kérlek add meg a nevet (legalább 2 karakter)!");
      isValid = false;
    }

    if (!parentEmail.value.trim() || !isValidEmail(parentEmail.value)) {
      showError(parentEmail, "Kérlek érvényes e-mail címet adj meg!");
      isValid = false;
    }

    const ageValue = Number(childAge.value);
    if (Number.isNaN(ageValue) || ageValue < 3 || ageValue > 10) {
      showError(childAge, "Az életkornak 3 és 10 között kell lennie.");
      isValid = false;
    }

    if (!favAnimal.value) {
      showError(favAnimal, "Kérlek válaszd ki a kedvenc állatot!");
      isValid = false;
    }

    let difficultySelected = false;
    difficultyInputs.forEach((input) => {
      if (input.checked) difficultySelected = true;
    });
    if (!difficultySelected) {
      const firstRadio = difficultyInputs[0];
      showError(firstRadio, "Kérlek válassz nehézségi szintet!");
      isValid = false;
    }

    if (!acceptTerms.checked) {
      showError(acceptTerms, "Az adatkezelési feltételek elfogadása kötelező.");
      isValid = false;
    }

    if (isValid) {
      if (successMsg) {
        successMsg.hidden = false;
      }
      form.reset();
    }
  });

  function showError(inputElement, message) {
    const group = inputElement.closest(".form-group, fieldset");
    if (!group) return;
    const errorElement = group.querySelector(".error-message");
    if (errorElement) {
      errorElement.textContent = message;
    }
    inputElement.classList.add("has-error");
  }

  function clearErrors() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((el) => (el.textContent = ""));
    const errorInputs = document.querySelectorAll(".has-error");
    errorInputs.forEach((el) => el.classList.remove("has-error"));
    const successMsg = document.getElementById("form-success");
    if (successMsg) {
      successMsg.hidden = true;
    }
  }

  function isValidEmail(email) {
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
  }
});
