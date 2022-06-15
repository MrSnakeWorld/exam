export const validateFirstName = (name: string) => {
	let error;
	if (!name) {
		error = 'Введите свое имя';
	}
	return error;
};

export const validateLastName = (name: string) => {
	let error;
	if (!name) {
		return error;
	}

	if (name.length >= 100) {
		error = 'Слишком длинная фаимилия';
	}

	return error;
};