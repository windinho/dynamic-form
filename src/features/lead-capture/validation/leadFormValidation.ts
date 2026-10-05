import type {
  FieldConfig,
  FormErrors,
  FormValues,
} from "../../../design-system/forms/DynamicForm/types";
import { isFieldVisible } from "../../../design-system/forms/DynamicForm/utils";

export function validateForm(
  config: FieldConfig[],
  values: FormValues,
): FormErrors {
  const errors: FormErrors = {};

  for (const field of config) {
    if (!isFieldVisible(field, values)) {
      continue;
    }

    const value = values[field.name];

    if (
      field.validations?.required &&
      (value === undefined || value === "" || value === false)
    ) {
      errors[field.name] = `${field.label} is required`;
      continue;
    }

    if (
      field.validations?.email &&
      typeof value === "string" &&
      value !== "" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      errors[field.name] = `${field.label} must be a valid email`;
    }

    if (
      field.validations?.pattern &&
      typeof value === "string" &&
      value !== "" &&
      !field.validations.pattern.test(value)
    ) {
      errors[field.name] = `${field.label} is invalid`;
    }

    if (
      field.validations?.maxLength &&
      typeof value === "string" &&
      value.length > field.validations.maxLength
    ) {
      errors[field.name] =
        `${field.label} must be ${field.validations.maxLength} characters or less`;
    }
  }

  return errors;
}
