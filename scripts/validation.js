// Test form, even if it leads nowhere

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const senderName = document.getElementById("senderName");
  const senderEmail = document.getElementById("senderEmail");
  const senderMessage = document.getElementById("senderMessage");
  const formStatus = document.getElementById("formStatus");

  function showError(input, message) {
    const error = document.getElementById(`${input.id}Error`);

    error.textContent = message;
    input.setAttribute("aria-invalid", "true");
  }

  function clearError(input) {
    const error = document.getElementById(`${input.id}Error`);

    error.textContent = "";
    input.removeAttribute("aria-invalid");
  }

//Stops page from refreshing aka browser default form submission
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    clearError(senderName);
    clearError(senderEmail);
    clearError(senderMessage);

    formStatus.textContent = "";

    if (senderName.value.trim().length < 2) {
      showError(senderName, "Please enter your full name.");
      isValid = false;
    }

    if (!senderEmail.value.trim() || !senderEmail.validity.valid) {
      showError(senderEmail, "Please enter a valid email address.");
      isValid = false;
    }

    if (senderMessage.value.trim().length < 10) {
      showError(senderMessage, "Please enter at least 10 characters.");
      isValid = false;
    }

    if (!isValid) {
      formStatus.textContent = "Please correct the highlighted fields.";

      contactForm.querySelector('[aria-invalid="true"]').focus();
      return;
    }

    formStatus.textContent =
formStatus.textContent =
  "Thank you for reaching out! An agent will get back to you shortly.";
    contactForm.reset();
  });

  [senderName, senderEmail, senderMessage].forEach(function (input) {
    input.addEventListener("input", function () {
      clearError(input);
      formStatus.textContent = "";
    });
  });
}