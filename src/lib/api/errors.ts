export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class ValidationError extends APIError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends APIError {
  constructor(message: string = 'غير مصرح لك بالوصول') {
    super(message, 401, 'AUTHENTICATION_ERROR');
    this.name = 'AuthenticationError';
  }
}

export class NotFoundError extends APIError {
  constructor(resource: string) {
    super(`${resource} غير موجود`, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export function handleAPIError(error: unknown): never {
  if (error instanceof APIError) {
    throw error;
  }

  if (error instanceof Error) {
    throw new APIError(error.message, 500, 'INTERNAL_SERVER_ERROR');
  }

  throw new APIError('حدث خطأ غير متوقع', 500, 'INTERNAL_SERVER_ERROR');
} 