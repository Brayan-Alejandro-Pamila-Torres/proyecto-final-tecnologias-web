const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmpty(value) {
  return value === null || value === undefined || String(value).trim() === '';
}

export function normalizeText(value) {
  return String(value ?? '').trim().toLowerCase();
}

export function isValidEmail(value) {
  return isEmpty(value) || EMAIL_PATTERN.test(String(value).trim());
}

export function isValidUrl(value) {
  if (isEmpty(value)) {
    return true;
  }

  try {
    const url = new URL(String(value).trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function hasMinLength(value, minLength) {
  return String(value ?? '').trim().length >= minLength;
}

export function hasMaxLength(value, maxLength) {
  return String(value ?? '').trim().length <= maxLength;
}

export function isSkillLevelValid(level) {
  const numericLevel = Number(level);
  return Number.isFinite(numericLevel) && numericLevel >= 1 && numericLevel <= 100;
}

export function hasDuplicateByField(items, value, field = 'name', ignoredIndex = null) {
  const normalizedValue = normalizeText(value);

  if (!normalizedValue) {
    return false;
  }

  return items.some((item, index) => {
    if (ignoredIndex !== null && index === ignoredIndex) {
      return false;
    }

    return normalizeText(item?.[field]) === normalizedValue;
  });
}

export function hasDuplicateSkill(skills, skillName, ignoredIndex = null) {
  return hasDuplicateByField(skills, skillName, 'name', ignoredIndex);
}

export function hasDuplicateProject(projects, projectName, ignoredIndex = null) {
  return hasDuplicateByField(projects, projectName, 'name', ignoredIndex);
}

export function validateRequired(value, message = 'Este campo es obligatorio.') {
  return isEmpty(value) ? message : '';
}

export function validateEmail(value, message = 'Ingresa un correo electronico valido.') {
  return isValidEmail(value) ? '' : message;
}

export function validateUrl(value, message = 'Ingresa una URL valida.') {
  return isValidUrl(value) ? '' : message;
}

export function validateTextLength(value, options = {}) {
  const { min, max, fieldName = 'El texto' } = options;

  if (min !== undefined && !hasMinLength(value, min)) {
    return `${fieldName} debe tener al menos ${min} caracteres.`;
  }

  if (max !== undefined && !hasMaxLength(value, max)) {
    return `${fieldName} no debe superar ${max} caracteres.`;
  }

  return '';
}

export function validateSkillLevel(level) {
  return isSkillLevelValid(level) ? '' : 'El nivel de habilidad debe estar entre 1 y 100.';
}

export function validateUniqueSkill(skills, skillName, ignoredIndex = null) {
  return hasDuplicateSkill(skills, skillName, ignoredIndex) ? 'Esta habilidad ya existe.' : '';
}

export function validateUniqueProject(projects, projectName, ignoredIndex = null) {
  return hasDuplicateProject(projects, projectName, ignoredIndex) ? 'Este proyecto ya existe.' : '';
}

export function validateField(value, rules = []) {
  for (const rule of rules) {
    const error = rule(value);

    if (error) {
      return error;
    }
  }

  return '';
}

export function validateFormValues(values, validationSchema = {}) {
  return Object.entries(validationSchema).reduce((errors, [fieldName, rules]) => {
    const error = validateField(values[fieldName], rules);

    if (error) {
      return {
        ...errors,
        [fieldName]: error,
      };
    }

    return errors;
  }, {});
}

export function hasValidationErrors(errors) {
  return Object.values(errors).some(Boolean);
}
