export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isPhoneIN(value: string): boolean {
  return /^[6-9]\d{9}$/.test(value.replace(/\s+/g, ""));
}

export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

export function minLength(value: string, n: number): boolean {
  return value.trim().length >= n;
}

export interface FieldErrors {
  [key: string]: string | undefined;
}
