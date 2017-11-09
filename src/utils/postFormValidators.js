import { isEmpty } from './strings';

/** Validate a specific post form field */
export function validateField(field, nextValue) {
  // NOTE Validation here is just an example, no empty string
  return isEmpty(nextValue) ?
    { valid: false, error: `${field} can't be an empty string` } :
    { valid: true };
}

/**
* Validate the whole form, as there may be rules that need to
* take into account multiple fields at the same time e.g.
* - two fields cannot have the same value
* - there can´t be any empty value
*/
export function validateForm(formData) {

  const valid =
    !isEmpty(formData.title) &&
    !isEmpty(formData.body) &&
    !isEmpty(formData.category) &&
    !isEmpty(formData.author);

  return valid ?
    { valid: true } :
    { valid: false, error: `No empty fields allowed` };
}
