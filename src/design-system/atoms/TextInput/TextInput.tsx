interface TextInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  hasError?: boolean;
  errorId?: string;
  type?: "text" | "email";
}

export const TextInput = ({
  id,
  value,
  onChange,
  onBlur,
  hasError,
  errorId,
  type = "text",
}: TextInputProps) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={(event) => onChange(event.target.value)}
    onBlur={onBlur}
    aria-invalid={hasError || undefined}
    aria-describedby={errorId}
  />
);
