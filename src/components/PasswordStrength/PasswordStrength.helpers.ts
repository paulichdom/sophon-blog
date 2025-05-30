export const passwordRequirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

export const getStrength = (password: string) => {
  let multiplier = password.length > 5 ? 0 : 1;

  passwordRequirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (passwordRequirements.length + 1)) * multiplier, 0);
}

export const validatePassword = (val: string): string | null => {
  if (!val || val.trim().length === 0) {
    return 'Password is required';
  }
  if (val.length < 6) {
    return 'Password should include at least 6 characters';
  }
  if (!/[0-9]/.test(val)) {
    return 'Password should include at least one number';
  }
  if (!/[a-z]/.test(val)) {
    return 'Password should include at least one lowercase letter';
  }
  if (!/[A-Z]/.test(val)) {
    return 'Password should include at least one uppercase letter';
  }
  if (!/[&$+,:;=?@#|'<>.^*()%!-]/.test(val)) {
    return 'Password should include at least one special character';
  }
  return null;
}