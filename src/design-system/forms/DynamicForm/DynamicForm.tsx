import { useState, type SyntheticEvent } from "react";
import type { FieldConfig, FormErrors, FormValues } from "./types";
import { Field } from "../../molecules";
import { Checkbox, TextArea, TextInput, Select, Button } from "../../atoms";
import "./DynamicForm.css";
import { isFieldVisible } from "./utils";

interface DynamicFormProps {
  config: FieldConfig[];
  validate: (config: FieldConfig[], values: FormValues) => FormErrors;
}

export function DynamicForm({ config, validate }: DynamicFormProps) {
  const getInitialValue = (type: FieldConfig["type"]): string | boolean => {
    return type === "checkbox" ? false : "";
  };
  const [values, setValues] = useState<FormValues>(() =>
    Object.fromEntries(
      config.map((field) => [field.name, getInitialValue(field.type)]),
    ),
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedValues, setSubmittedValues] = useState<FormValues | null>(
    null,
  );

  const handleChange = (name: string, value: string | boolean) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleBlur = (name: string) => {
    const nextErrors = validate(config, values);

    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };

      if (nextErrors[name]) {
        updatedErrors[name] = nextErrors[name];
      } else {
        delete updatedErrors[name];
      }

      return updatedErrors;
    });
  };

  const renderFieldControl = (field: FieldConfig) => {
    {
      if (field.type === "text")
        return (
          <TextInput
            id={field.name}
            value={String(values[field.name] ?? "")}
            onChange={(value) => handleChange(field.name, value)}
            hasError={Boolean(errors[field.name])}
            errorId={`${field.name}-error`}
            onBlur={() => handleBlur(field.name)}
          />
        );
    }
    {
      if (field.type === "email")
        return (
          <TextInput
            id={field.name}
            type="email"
            value={String(values[field.name] ?? "")}
            onChange={(value) => handleChange(field.name, value)}
            hasError={Boolean(errors[field.name])}
            errorId={`${field.name}-error`}
            onBlur={() => handleBlur(field.name)}
          />
        );
    }
    {
      if (field.type === "select")
        return (
          <Select
            id={field.name}
            value={String(values[field.name] ?? "")}
            options={field.options ?? []}
            onChange={(value) => handleChange(field.name, value)}
            hasError={Boolean(errors[field.name])}
            errorId={`${field.name}-error`}
            onBlur={() => handleBlur(field.name)}
          />
        );
    }
    {
      if (field.type === "textarea")
        return (
          <TextArea
            id={field.name}
            value={String(values[field.name] ?? "")}
            onChange={(value) => handleChange(field.name, value)}
            hasError={Boolean(errors[field.name])}
            errorId={`${field.name}-error`}
            onBlur={() => handleBlur(field.name)}
            maxLength={field.validations?.maxLength}
          />
        );
    }
    {
      if (field.type === "checkbox")
        return (
          <Checkbox
            id={field.name}
            value={Boolean(values[field.name])}
            onChange={(value) => handleChange(field.name, value)}
            hasError={Boolean(errors[field.name])}
            errorId={`${field.name}-error`}
          />
        );
    }
  };

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const nextErrors = validate(config, values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const submittedData = Object.fromEntries(
      config
        .filter((field) => isFieldVisible(field, values))
        .map((field) => [field.name, values[field.name]]),
    );

    setSubmittedValues(submittedData);
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        {config.map((field) => {
          if (!isFieldVisible(field, values)) {
            return null;
          }

          const value = values[field.name];

          const characterCount = typeof value === "string" ? value.length : 0;

          const hint =
            field.type === "textarea" && field.validations?.maxLength
              ? `${characterCount} / ${field.validations.maxLength} characters`
              : undefined;

          return (
            <Field
              key={field.name}
              label={field.label}
              htmlFor={field.name}
              error={errors[field.name]}
              errorId={`${field.name}-error`}
              desktopSpan={field.desktopSpan}
              variant={field.variant}
              hint={hint}
            >
              {renderFieldControl(field)}
            </Field>
          );
        })}
        <div className="form__actions">
          <Button type="submit" label="Submit" />
        </div>
      </form>

      {submittedValues && <pre>{JSON.stringify(submittedValues, null, 2)}</pre>}
    </>
  );
}
