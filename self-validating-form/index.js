function isValidName(name) {
	const nameRegex = /^[a-zA-Z]+$/;
	return name.test(nameRegex);
}

function isValidUsername(username) {
	const usernameRegex = /^[a-zA-Z0-9._]+$/
	return username.test(usernameRegex);
}

function isValidBirthDay(day) {
    const birthdayRegex = /^[0-9]{2}$/
    return day.test(birthdayRegex);
}

function isValidBirthYear(year) {
    const birthYearRegex = /^[0-9]{4}$/
    return year.test(birthYearRegex);
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

function validate(event) {
	const inputElement = event.target;
	inputElement.classList.add('signup__field__input--error');

	const errorMessageElement = event.target.parentElement.getElementsByClassName('signup__field__error')[0];
	errorMessageElement.innerHTML = 'Sample Error';
}

const inputs = document.getElementsByClassName('signup__field__input');

for (const input of inputs) {
	input.onblur = validate;
}