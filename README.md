# Dynamic Form & Design System

## Overview

This project implements a dynamic lead-capture form using React and TypeScript.

The form is generated from a configuration array rather than hardcoded field JSX. Validation rules are defined separately and passed into a reusable DynamicForm component.

## Features

- Dynamic form rendering from configuration
- Reusable design-system components
- Validation on blur and submit
- Conditional field rendering
- Mobile and desktop responsive layout
- TypeScript support

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

## Folder Structure

```text
src/
├── design-system/
│   ├── tokens/
│   ├── atoms/
│   ├── molecules/
│   └── forms/
│
└── features/
    └── lead-capture/
        ├── config/
        ├── validation/
        ├── pages/
        └── types/
```

## Design System

### Tokens

- Colors
- Typography
- Spacing
- Breakpoints

### Atoms

- TextInput
- Select
- TextArea
- Checkbox
- Button

### Molecules

- Field

### Forms

- DynamicForm

## Lead Capture Feature

The lead-capture feature is configured through a `leadFormConfig` array.

Each field defines:

- Name
- Type
- Label
- Validation rules
- Conditional visibility rules

Example:

```ts
{
  name: "email",
  type: "email",
  label: "Email",
  validations: {
    required: true,
    email: true,
  },
}
```

## Validation

Validation is implemented in a separate module and passed into the DynamicForm component.

Supported validation rules:

- required
- email
- pattern
- maxLength

## Conditional Fields

The Company Name field is displayed only when Lead Type is set to Company.

This is configured using the `dependsOn` property in the field configuration.

## Responsive Layout

- Mobile: single-column layout
- Desktop: two-column layout
- Fields can span one or two columns using `desktopSpan`

## Technical Decisions

- Form rendering is configuration-driven.
- Validation logic is separated from rendering.
- Design-system components are reusable and feature-agnostic.
- No component library was used.
- TypeScript types are shared across the form system.

```

```
