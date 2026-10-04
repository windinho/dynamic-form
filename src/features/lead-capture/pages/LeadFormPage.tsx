import { DynamicForm } from "../../../design-system/forms";
import { leadFormConfig } from "../config/leadFormConfig";
import { validateForm } from "../validation/leadFormValidation";
import "./LeadFormPage.css";

export function LeadFormPage() {
  return (
    <main className="page">
      <div className="page__content">
        <h1 className="page__title">Lead Capture</h1>

        <DynamicForm config={leadFormConfig} validate={validateForm} />
      </div>
    </main>
  );
}
