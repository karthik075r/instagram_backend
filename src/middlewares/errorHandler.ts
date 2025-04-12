import { NextFunction, Response, Request } from "express";

// Define a custom error interface for type safety
interface CustomError extends Error {
  status?: number;
  response?: {
    data?: {
      error_message?: string;
      code?: string;
    };
  };
}

// Define a custom AuthError class
class AuthError extends Error implements CustomError {
  status: number;
  code?: string;

  constructor(status: number, message: string, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
    this.name = "AuthError";
  }
}

// Error-handling middleware
const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("Error:", err);

  const statusCode = err.status || 500;
  const errorResponse = {
    errorMessage:
      err.response?.data?.error_message ||
      err.message ||
      "Internal Server Error",
    code: err.response?.data?.code || (err as AuthError).code || undefined,
  };

  // Use res.status() as a method
  res.status(statusCode).send(errorResponse);
};

export default errorHandler;
