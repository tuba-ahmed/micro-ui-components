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

function validatePassword(password) {
	if (!password) {
		throw new ValidationError('Password cannot be empty');
	}
	if (password.length < 6) {
		throw new ValidationError('Password length too short');
	}
}

function validateConfirmPassword(password) {
	const currentPassword = document.getElementsByClassName('signup__field__inputs__input--password')[0].value;
	if (password && password !== currentPassword) {
		throw new ValidationError('Password did not match');
	}
}

export {
	ValidationError,
	validateName,
	validateUsername,
	validateDay,
	validateYear,
	validateEmail,
	validatePassword,
	validateConfirmPassword,
	validatePhoneNumber
};