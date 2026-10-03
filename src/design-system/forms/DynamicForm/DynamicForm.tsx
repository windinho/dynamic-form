import { useState } from "react";
import type { FieldConfig, FormErrors } from "./types";
import { Field } from "../../molecules";
import { Checkbox } from "../../atoms";
import { TextInput } from "../../atoms";
import { Select } from "../../atoms";
import { TextArea } from "../../atoms";
import { Button } from "../../atoms";
import "./DynamicForm.css";

interface DynamicFormProps {
  config: FieldConfig[];
  validate: (
    config: FieldConfig[],
    values: Record<string, string | boolean>,
  ) => Record<string, string>;
}

export function DynamicForm({ config, validate }: DynamicFormProps) {
  const getInitialValue = (type: FieldConfig["type"]): string | boolean => {
    return type === "checkbox" ? false : "";
  };
  const [values, setValues] = useState<Record<string, string | boolean>>(() =>
    Object.fromEntries(
      config.map((field) => [field.name, getInitialValue(field.type)]),
    ),
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedValues, setSubmittedValues] = useState<Record<
    string,
    string | boolean
  > | null>(null);

  const handleChange = (name: string, value: string | boolean) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleBlur = () => {
    const nextErrors = validate(config, values);

    setErrors(nextErrors);
  };

  return (
    <>
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          const nextErrors = validate(config, values);
          setErrors(nextErrors);
          if (Object.keys(nextErrors).length > 0) {
            return;
          }
          setSubmittedValues(values);
        }}
      >
        {config.map((field) => {
          if (
            field.dependsOn &&
            values[field.dependsOn.field] !== field.dependsOn.value
          ) {
            return null;
          }
          return (
            <Field
              key={field.name}
              label={field.label}
              htmlFor={field.name}
              error={errors[field.name]}
              errorId={`${field.name}-error`}
              desktopSpan={field.desktopSpan}
            >
              {field.type === "text" && (
                <TextInput
                  id={field.name}
                  value={String(values[field.name] ?? "")}
                  onChange={(value) => handleChange(field.name, value)}
                  hasError={Boolean(errors[field.name])}
                  errorId={`${field.name}-error`}
                  onBlur={handleBlur}
                />
              )}
              {field.type === "email" && (
                <TextInput
                  id={field.name}
                  type="email"
                  value={String(values[field.name] ?? "")}
                  onChange={(value) => handleChange(field.name, value)}
                  hasError={Boolean(errors[field.name])}
                  errorId={`${field.name}-error`}
                  onBlur={handleBlur}
                />
              )}
              {field.type === "select" && (
                <Select
                  id={field.name}
                  value={String(values[field.name] ?? "")}
                  options={field.options ?? []}
                  onChange={(value) => handleChange(field.name, value)}
                  hasError={Boolean(errors[field.name])}
                  errorId={`${field.name}-error`}
                  onBlur={handleBlur}
                />
              )}
              {field.type === "textarea" && (
                <TextArea
                  id={field.name}
                  value={String(values[field.name] ?? "")}
                  onChange={(value) => handleChange(field.name, value)}
                  hasError={Boolean(errors[field.name])}
                  errorId={`${field.name}-error`}
                  onBlur={handleBlur}
                />
              )}
              {field.type === "checkbox" && (
                <Checkbox
                  id={field.name}
                  value={Boolean(values[field.name])}
                  onChange={(value) => handleChange(field.name, value)}
                  hasError={Boolean(errors[field.name])}
                  errorId={`${field.name}-error`}
                  onBlur={handleBlur}
                />
              )}
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
