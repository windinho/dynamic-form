interface TextAreaProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  hasError?: boolean;
  errorId?: string;
}

export function TextArea({
  id,
  value,
  onChange,
  onBlur,
  hasError,
  errorId,
}: TextAreaProps) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      aria-invalid={hasError || undefined}
      aria-describedby={errorId}
    />
  );
}
