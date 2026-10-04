export type FieldType = "text" | "email" | "select" | "textarea" | "checkbox";

export interface SelectOption {
  label: string;
  value: string;
}

export interface ValidationRules {
  required?: boolean;
  email?: boolean;
  pattern?: RegExp;
  maxLength?: number;
}

export interface FieldDependency {
  field: string;
  value: string;
}

export interface FieldConfig {
  name: string;
  type: FieldType;
  label: string;
  options?: SelectOption[];
  validations?: ValidationRules;
  dependsOn?: FieldDependency;
  desktopSpan?: 1 | 2;
  variant?: "default" | "checkbox";
}

export type FormValues = Record<string, string | boolean>;

export type FormErrors = Record<string, string>;
