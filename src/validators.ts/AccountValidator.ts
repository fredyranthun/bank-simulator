// src/presentation/validators/AccountValidator.ts
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class AccountValidator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static validateEvent(data: any): ValidationResult {
    const errors: string[] = [];

    if (
      !data.type ||
      typeof data.type !== "string" ||
      ["deposit", "withdraw", "transfer"].includes(data.type) === false
    ) {
      errors.push("Event type is required and must be one of: deposit, withdraw, transfer");
    }

    if (data.type === "transfer") {
      if (!data.origin || typeof data.origin !== "string") {
        errors.push("'origin' is required and must be a string");
      }
      if (!data.destination || typeof data.destination !== "string") {
        errors.push("'destination' is required and must be a string");
      }
    } else if (data.type === "deposit") {
      if (!data.destination || typeof data.destination !== "string") {
        errors.push("'destination' is required and must be a string");
      }
    } else if (data.type === "withdraw") {
      if (!data.origin || typeof data.origin !== "string") {
        errors.push("'origin' is required and must be a string");
      }
    }

    if (data.amount === undefined || data.amount === null) {
      errors.push("Amount is required");
    }

    if (typeof data.amount !== "number" || isNaN(data.amount)) {
      errors.push("Amount must be a valid number");
    }

    if (data.amount <= 0) {
      errors.push("Amount must be positive");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

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
