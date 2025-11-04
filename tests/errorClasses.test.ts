import {
  AppError,
  RepositoryError,
  ServiceError,
  AuthenticationError,
  AuthorizationError,
} from "../src/api/v1/errors/errors";
import { HTTP_STATUS } from "../src/constants/httpconstants";

describe("🧱 Custom Error Classes", () => {
  it("should create an AppError correctly", () => {
    const err = new AppError("Base error", "APP_ERROR", HTTP_STATUS.BAD_REQUEST);
    expect(err.message).toBe("Base error");
    expect(err.code).toBe("APP_ERROR");
    expect(err.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(err).toBeInstanceOf(AppError);
  });

  it("should create a RepositoryError correctly", () => {
    const err = new RepositoryError("Repo failed", "DB_ERROR");
    expect(err.message).toBe("Repo failed");
    expect(err.code).toBe("DB_ERROR");
    expect(err.statusCode).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(err).toBeInstanceOf(RepositoryError);
  });

  it("should create a ServiceError correctly", () => {
    const err = new ServiceError("Service issue");
    expect(err.message).toBe("Service issue");
    expect(err.code).toBe("SERVICE_ERROR");
    expect(err.statusCode).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(err).toBeInstanceOf(ServiceError);
  });

  it("should create an AuthenticationError correctly", () => {
    const err = new AuthenticationError("Invalid token");
    expect(err.message).toBe("Invalid token");
    expect(err.code).toBe("AUTHENTICATION_ERROR");
    expect(err.statusCode).toBe(HTTP_STATUS.UNAUTHORIZED);
    expect(err).toBeInstanceOf(AuthenticationError);
  });

  it("should create an AuthorizationError correctly", () => {
    const err = new AuthorizationError("Access denied");
    expect(err.message).toBe("Access denied");
    expect(err.code).toBe("AUTHORIZATION_ERROR");
    expect(err.statusCode).toBe(HTTP_STATUS.FORBIDDEN);
    expect(err).toBeInstanceOf(AuthorizationError);
  });
});
