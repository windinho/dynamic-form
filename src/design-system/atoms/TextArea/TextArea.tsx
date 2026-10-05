import "./Textarea.css";

interface TextAreaProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  hasError?: boolean;
  errorId?: string;
  maxLength?: number;
}

export function TextArea({
  id,
  value,
  onChange,
  onBlur,
  hasError,
  errorId,
  maxLength,
}: TextAreaProps) {
  return (
    <textarea
      id={id}
      className="textarea"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      aria-invalid={hasError || undefined}
      aria-describedby={errorId}
      maxLength={maxLength}
    />
  );
}
