import { ValidationError } from 'class-validator';

export interface FieldError {
  field: string;
  message: string;
}

export function formatValidationErrors(errors: ValidationError[]): FieldError[] {
  return errors.map((error) => ({
    field: error.property,
    message: Object.values(error.constraints || {})[0],
  }));
}
