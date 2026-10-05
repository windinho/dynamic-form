import type { SelectOption } from "../../forms/DynamicForm/types";
import "./Select.css";

interface SelectProps {
  id: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  onBlur?: () => void;
  hasError?: boolean;
  errorId?: string;
}

export const Select = ({
  id,
  value,
  options,
  onChange,
  onBlur,
  hasError,
  errorId,
}: SelectProps) => (
  <select
    id={id}
    className="select"
    value={value}
    onChange={(event) => onChange(event.target.value)}
    onBlur={onBlur}
    aria-invalid={hasError || undefined}
    aria-describedby={errorId}
  >
    <option value="" disabled>
      Select an option
    </option>
    {options.map((option) => (
      <option
        key={option.value}
        value={option.value}
        label={option.label}
      ></option>
    ))}
  </select>
);
