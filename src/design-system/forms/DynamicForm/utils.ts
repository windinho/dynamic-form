import type { FieldConfig, FormValues } from "./types";

export const isFieldVisible = (
  field: FieldConfig,
  values: FormValues,
): boolean =>
  !field.dependsOn || values[field.dependsOn.field] === field.dependsOn.value;
