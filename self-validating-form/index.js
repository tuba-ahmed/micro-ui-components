class ValidationError extends Error {
	constructor(message) {
		super();
		this.message = message;
	}
}

function validateName(name) {
	const nameRegex = /^[a-zA-Z]+$/;
	if (!nameRegex.test(name)) {
		throw new ValidationError('Please enter a valid name.');
	}
}

function validateUsername(username) {
	const usernameRegex = /^[a-zA-Z0-9._]+$/;
	if (!usernameRegex.test(username)) {
		throw new ValidationError('Please enter a valid username.');
	}
}

function validateDay(day) {
	const birthdayRegex = /^[0-9]{2}$/;
	if (!birthdayRegex.test(day)) {
		throw new ValidationError('Please enter a valid Birthday.');
	}
}

function validateYear(year) {
	const birthYearRegex = /^[0-9]{4}$/;
	if (!birthYearRegex.test(year)) {
		throw new ValidationError('Please enter a valid Birthyear.');
	}
}

function validateEmail(email) {
	const emailRegex = /^[a-zA-Z0-9]{1}[a-zA-Z0-9@._-]+[a-zA-Z]$/;
	if (!emailRegex.test(email)) {
		throw new ValidationError('Please enter a valid email');
	}
	const necessaryEmailCharacters = ['@', '.'];
	for (const necessaryEmailCharacter of necessaryEmailCharacters) {
		if (!email.includes(necessaryEmailCharacter)) {
			throw new ValidationError('Please enter a valid email');
		}
	}
}

function validatePhoneNumber(phoneNumber) {
	const FORMATTING_CHARACTERS = ['(', ')', '-'];

	function validateFormattedNumber() {
		const regex = /^[0-9(]{1}[0-9)-]+[0-9]$/;
		const hasOpeningParentheses = phoneNumber.includes('(');
		const hasClosingParentheses = phoneNumber.includes(')');
		if (hasOpeningParentheses && !hasClosingParentheses) {
			throw new ValidationError('Phone number missing closing parentheses');
		}
		if (!regex.test(phoneNumber)) {
			throw new ValidationError('Please enter valid phone number');
		}
	}

	function validateNonformattedNumber() {
		const regex = /^[0-9]+$/;
		if (!regex.test(phoneNumber)) {
			throw new ValidationError('Please enter valid phone number');
		}
	}
	for (const formattingCharacter of FORMATTING_CHARACTERS) {
		if (phoneNumber.includes(formattingCharacter)) {
			return validateFormattedNumber();
		}
	}
	validateNonformattedNumber();
}

const PASSWORD_CATEGORIES = {
	GOOD: 'password_good',
	FAIR: 'password_fair',
	WEAK: 'password_weak',
}

function getPasswordCategory(password) {
	const hasLettersRegex = /[a-zA-Z]+/
	const hasNumbersRegex = /[0-9]+/
	const hasOnlyLettersAndNumbersRegex = /^[a-zA-Z0-9]{6,}$/

	function isGoodPassword() {
		return hasLettersRegex.test(password) &&
			hasNumbersRegex.test(password) &&
			hasOnlyLettersAndNumbersRegex.test(password);
	}

	function isFairPassword() {
		return hasOnlyLettersAndNumbersRegex.test(password);
	}

	if (isGoodPassword()) {
		return PASSWORD_CATEGORIES.GOOD;
	}
	if (isFairPassword()) {
		return PASSWORD_CATEGORIES.FAIR;
	}
	return PASSWORD_CATEGORIES.WEAK;
}

const validationMapping = {
	'name': validateName,
	'email': validateEmail,
	'username': validateUsername,
	'day': validateDay,
	'year': validateYear,
	'phoneNumber': validatePhoneNumber
}


function validate(event) {
	const inputElement = event.target;
	const field = inputElement.dataset.field;
	if (field === 'password') {
		return;
	}
	const errorMessageElement = event.target.parentElement.getElementsByClassName('signup__field__error')[0];
	try {
		validationMapping[field](inputElement.value);
		errorMessageElement.innerHTML = '';
		inputElement.classList.remove('signup__field__input--error');
	} catch (err) {
		if (!(err instanceof ValidationError)) {
			throw err;
		}
		errorMessageElement.innerHTML = err.message;
		inputElement.classList.add('signup__field__input--error');
	}
}

const inputs = document.getElementsByClassName('signup__field__input');

for (const input of inputs) {
	input.onblur = validate;
}