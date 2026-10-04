import "./Checkbox.css";

interface CheckboxProps {
  id: string;
  value: boolean;
  onChange: (value: boolean) => void;
  onBlur?: () => void;
  hasError?: boolean;
  errorId?: string;
}

export function Checkbox({ id, value, onChange, onBlur }: CheckboxProps) {
  return (
    <input
      id={id}
      className="checkbox"
      type="checkbox"
      checked={value}
      onChange={(event) => onChange(event.target.checked)}
      onBlur={onBlur}
    />
  );
}
