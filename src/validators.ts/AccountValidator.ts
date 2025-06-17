// src/presentation/validators/AccountValidator.ts
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class AccountValidator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static validateAccountId(accountId: any): ValidationResult {
    const errors: string[] = [];

    if (!accountId || typeof accountId !== "string") {
      errors.push("Account ID is required and must be a string");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
