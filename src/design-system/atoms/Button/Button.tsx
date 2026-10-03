interface ButtonProps {
  label: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({
  label,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button type={type} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
}
