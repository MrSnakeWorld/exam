const validateEmail = (email: string) => {
	let error;
	if (!email) {
		error = 'Введите свою почту';
	} else if (
		!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
	) {
		error = 'Неправильно введена почта';
	}
	return error;
};

export default validateEmail;