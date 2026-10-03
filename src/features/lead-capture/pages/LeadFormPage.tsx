import { DynamicForm } from "../../../design-system/forms/DynamicForm/DynamicForm";
import { leadFormConfig } from "../config/leadFormConfig";
import { validateForm } from "../validation/leadFormValidation";

export function LeadCapturePage() {
  return <DynamicForm config={leadFormConfig} validate={validateForm} />;
}
