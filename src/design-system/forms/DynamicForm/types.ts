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

export interface FieldConfig {
  name: string;
  type: FieldType;
  label: string;
  options?: SelectOption[];
  validations?: ValidationRules;
  dependsOn?: {
    field: string;
    value: string;
  };
  desktopSpan?: 1 | 2;
}

export type FormValues = Record<string, string | boolean>;

export type FormErrors = Record<string, string>;
