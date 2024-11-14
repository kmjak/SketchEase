const validateName = (name: string): boolean => {
  if (name.length < 2) {
    return false;
  }

  if (name.length > 20) {
    return false;
  }

  if (!/^[a-zA-Z0-9]+$/.test(name)) {
    return false;
  }

  return true;
};

const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!$%&+*@?])[A-Za-z\d!$%&+*@?]{8,20}$/;
  return passwordRegex.test(password);
};

export {
  validateName,
  validatePassword
};