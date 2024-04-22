export const validateName = (name) => name.trim().length >= 3;

export const validateEmail = (email: string) => /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)/.test(email);

export const validatePassword = (password: string) => /(?=.*\d)(?=.*[A-z])(?=.*[a-z]).{8,}/.test(password);

export const validateConfirmPassword = (confirmPassword: string, password: string) => confirmPassword === password;