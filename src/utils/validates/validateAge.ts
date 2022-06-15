const validatePass = (age?: number) => {
  let error;
  if (age === undefined) {
    error = 'Необходимо указать возраст';
    return error;
  }

  if (age <= 0) {
    error = 'Возраст не может быть равен или меньше нуля';
  } else if (age > 200) {
    error =
      'Как-то не верится, что ваш возраст действительно настолько почтенный';
  }
  return error;
};

export default validatePass;
