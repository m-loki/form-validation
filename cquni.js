// FORM VALIDATION

const form = document.getElementById("pForm");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const cname = document.getElementById("cname");
const fieldsets = document.querySelectorAll("fieldset");

function showErr(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";

  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function isValidEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showErr(input, "Email is not valid");
  }
}

function checkRequired(inputArr) {
  inputArr.forEach((fieldInput) => {
    if (fieldInput.value.trim() === "") {
      showErr(fieldInput, `This field is required.`);
    } else {
      showSuccess(fieldInput);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length === min) {
    showErr(input, `Please enter a valid name`);
  } else if (input.value.length > max) {
    showErr(input, `Field value must be less than ${max} characters`);
  }
}

function checkFieldSet(fieldset) {
  const checkBoxes = fieldset.querySelectorAll("input[type='checkbox']");
  const isChecked = Array.from(checkBoxes).some((checkbox) => checkbox.checked);

  if (!isChecked) {
    fieldset.className = "form-control error";
    const small = fieldset.querySelector("small");
    small.innerText = "Please select at least one option";
    return false;
  } else {
    fieldset.className = "form-control success";
    const small = fieldset.querySelector("small");
    small.innerText = "";
    return true;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isFormValid = true;
  checkRequired([fname, lname, email, cname]);
  checkLength(fname, 1, 25);
  checkLength(lname, 1, 25);
  checkLength(cname, 1, 50);
  isValidEmail(email);

  fieldsets.forEach((fieldset) => {
    checkFieldSet(fieldset);
  });

  const errors = document.querySelectorAll(".form-control.error");
  if (errors.length > 0) {
    isFormValid = false;
  }

  if (isFormValid) {
    form.submit();
  }
});
