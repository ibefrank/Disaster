export function isValidPhone(phone: string): boolean {
  // Basic phone validation - at least 10 digits
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10;
}

export function isValidName(name: string): boolean {
  return name.trim().length >= 2;
}

export function sanitizeInput(input: string): string {
  return input.trim().substring(0, 500);
}

export function isValidEmergencyDescription(description: string): boolean {
  return description.trim().length >= 5 && description.trim().length <= 500;
}
