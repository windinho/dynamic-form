import type { FieldConfig } from "../../../design-system/forms/DynamicForm/types";

export const leadFormConfig: FieldConfig[] = [
  {
    name: "fullname",
    type: "text",
    label: "Full Name",
    validations: { required: true },
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    validations: { required: true, email: true },
  },
  {
    name: "leadType",
    type: "select",
    label: "Lead Type",
    options: [
      {
        label: "Individual",
        value: "individual",
      },
      {
        label: "Company",
        value: "company",
      },
    ],
    validations: { required: true },
  },
  {
    name: "companyName",
    type: "text",
    label: "Company Name",
    dependsOn: {
      field: "leadType",
      value: "company",
    },
    validations: { required: true },
  },
  {
    name: "phone",
    type: "text",
    label: "Phone",
    validations: { required: true, pattern: /^\d{10}$/ },
  },
  {
    name: "notes",
    type: "textarea",
    label: "Notes",
    validations: {
      maxLength: 200,
    },
    desktopSpan: 2,
  },
  {
    name: "consent",
    type: "checkbox",
    label: "I agree to be contacted",
    validations: {
      required: true,
    },
    desktopSpan: 2,
  },
];
