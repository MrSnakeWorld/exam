const validatePass = (pass: string) => {
	let error;
	if (!pass) {
		error = 'Введите свой пароль';
	}
	return error;
};

export default validatePass;