const validateEmail = (email: string) => {
  let error;
  if (!email) {
    return 'Введите свою почту';
  }

  if (email === 'admin') {
    return error;
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    error = 'Неправильно введена почта';
  }
  return error;
};

export default validateEmail;
