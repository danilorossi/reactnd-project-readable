export function validateField(field, nextValue) {

  // NOTE Validation here is just an example, non empty string,
  // but we can make it as complex as needed.
  return isEmpty(nextValue) ?
    { valid: false, error: `${field} can't be an empty string` } :
    { valid: true };
}

export function validateForm(formData) {

  // NOTE this is for form level validation checks
  // e.g. two fields cannot have the same value
  // or there can´t be any empty value
  const valid =
    !isEmpty(formData.body) &&
    !isEmpty(formData.author);

  return valid ?
    { valid: true } :
    { valid: false, error: `No empty fields allowed` };

}

function isEmpty(string) {
  return !string || string.trim().length === 0;
}
