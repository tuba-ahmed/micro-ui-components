import {
	ValidationError,
	validateName,
	validateUsername,
	validateDay,
	validateYear,
	validateEmail,
	validatePassword,
	validateConfirmPassword,
	validatePhoneNumber
} from './validation.js';
import {
	showGuide,
	hideGuide,
	updateGuide
} from './passwordguide.js';

const validationMapping = {
	'name': validateName,
	'email': validateEmail,
	'username': validateUsername,
	'password': validatePassword,
	'confirmPassword': validateConfirmPassword,
	'day': validateDay,
	'year': validateYear,
	'phoneNumber': validatePhoneNumber
}


function validate(inputElement) {
	const field = inputElement.dataset.field;

	if (field === 'password') {
		const confirmPassword = document.getElementsByClassName('signup__field__inputs__input--confirm-password')[0];
		validate(confirmPassword);
	}

	const errorMessageElement = inputElement.parentElement.parentElement.getElementsByClassName('signup__field__error')[0];
	try {
		validationMapping[field](inputElement.value);
		errorMessageElement.innerHTML = '';
		inputElement.classList.remove('signup__field__inputs__input--error');
	} catch (err) {
		if (!(err instanceof ValidationError)) {
			// Log real error
			throw err
		}
		errorMessageElement.innerHTML = err.message;
		inputElement.classList.add('signup__field__inputs__input--error');
	}
}

const inputs = document.getElementsByClassName('signup__field__inputs__input');

for (const input of inputs) {
	input.onblur = (event) => {
		validate(event.target);
		hideGuide(event.target);
	}
	input.onfocus = (event) => showGuide(event.target);
	input.onkeyup = (event) => updateGuide(event.target);
}