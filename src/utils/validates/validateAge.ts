const validatePass = (age?: number) => {
	let error;
	if (!age) {
		return error;
	}

	if (age <= 0) {
		error = 'Возраст не может быть меньше нуля';
	} else if (age > 200) {
		error = 'Как-то не верится, что ваш возраст действительно настолько почтенный';
	}
	return error;
};

export default validatePass;