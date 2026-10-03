import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  htmlFor: string;
  errorId?: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  desktopSpan?: 1 | 2;
}

export function Field({
  label,
  htmlFor,
  errorId,
  error,
  hint,
  children,
  desktopSpan,
}: FieldProps) {
  return (
    <div className={`field ${desktopSpan === 2 ? "field--span-2" : ""}`}>
      <label className="field__label" htmlFor={htmlFor}>
        {label}
      </label>

      {children}

      {hint && <small className="field__hint">{hint}</small>}

      {error && (
        <p id={errorId} className="field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
