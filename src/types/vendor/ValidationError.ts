export type ValidationError = {
  status: number;
  error: string;
  message: string;
  errors: FieldError[];
}

type FieldError = {
  fieldName: string;
  message: string;
}
