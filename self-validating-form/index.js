import {
	ValidationError,
	validateName,
	validateUsername,
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
import {
	gtLocalWeatherStats
} from './localweather.js'
const validationMapping = {
	'name': validateName,
	'email': validateEmail,
	'username': validateUsername,
	'password': validatePassword,
	'confirmPassword': validateConfirmPassword,
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

let signupForm = document.getElementById("signup-wrapper");
signupForm.addEventListener('submit', (event) => {
	const formElement = document.forms['signup-wrapper'];
	const formData = new FormData(formElement);
	let username = formData.get('username');
	window.sessionStorage.setItem('username', username);
	toggleContent();
});

toggleContent();

//toggling content
function toggleContent() {
	const username = window.sessionStorage.getItem('username');
	let signupWrapper = document.getElementById('signup-wrapper');
	let landingPageWrapper = document.getElementById('landing-page-wrapper');
	if (username) {
		signupWrapper.style.display = 'none';
		let landingPageWelcomeMsg = landingPageWrapper.getElementsByClassName('signup__field__header')[0];
		if (landingPageWelcomeMsg) {
			landingPageWelcomeMsg.innerText = "Hi There " + window.sessionStorage.getItem('username') + "! Welcome to the local weather app.";
		}
	} else {
		landingPageWrapper.style.display = 'none';
	}
}


document.getElementById('get-local-weather-stats').addEventListener('click', gtLocalWeatherStats);