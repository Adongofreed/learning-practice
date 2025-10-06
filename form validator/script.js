// STEP 1️⃣: Select all important elements
const form = document.getElementById('signup-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// STEP 2️⃣: Helper functions to show errors or success
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error'; // adds red border
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success'; // adds green border
  const small = formControl.querySelector('small');
  small.innerText = ''; // remove any previous message
}

// STEP 3️⃣: Check if email is valid (using RegEx)
function isValidEmail(emailValue) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(emailValue);
}

// STEP 4️⃣: Main form validation function
form.addEventListener('submit', function (e) {
  e.preventDefault(); // stop form from submitting automatically

  // Trim to remove extra spaces
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  // Username validation
  if (usernameValue === '') {
    showError(username, 'Username is required');
  } else if (usernameValue.length < 3) {
    showError(username, 'Username must be at least 3 characters');
  } else {
    showSuccess(username);
  }

  // Email validation
  if (emailValue === '') {
    showError(email, 'Email is required');
  } else if (!isValidEmail(emailValue)) {
    showError(email, 'Enter a valid email address');
  } else {
    showSuccess(email);
  }

  // Password validation
  if (passwordValue === '') {
    showError(password, 'Password is required');
  } else if (passwordValue.length < 6) {
    showError(password, 'Password must be at least 6 characters');
  } else {
    showSuccess(password);
  }

  // Confirm password validation
  if (password2Value === '') {
    showError(password2, 'Please confirm your password');
  } else if (password2Value !== passwordValue) {
    showError(password2, 'Passwords do not match');
  } else {
    showSuccess(password2);
  }
});
