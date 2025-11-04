import express, { Request, Response, NextFunction } from "express";
import request from "supertest";
import errorHandler from "../src/api/v1/middleware/errorHandler";
import { AppError } from "../src/api/v1/errors/errors";
import { HTTP_STATUS } from "../src/constants/httpconstants";

const app = express();

// A sample route that throws an AppError
app.get("/custom-error", (_req: Request, _res: Response, next: NextFunction) => {
  next(new AppError("Custom error", "CUSTOM_ERROR", HTTP_STATUS.BAD_REQUEST));
});

// A route that throws a generic error
app.get("/unexpected-error", (_req: Request, _res: Response, next: NextFunction) => {
  next(new Error("Unexpected failure"));
});

// Apply the global error handler
app.use(errorHandler);

describe("🌐 Global Error Handler", () => {
  it("should handle AppError and return formatted response", async () => {
    const res = await request(app).get("/custom-error");

    expect(res.status).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("CUSTOM_ERROR");
    expect(res.body.error.message).toBe("Custom error");
    expect(res.body.timestamp).toBeDefined();
  });

  it("should handle unexpected errors and return generic response", async () => {
    const res = await request(app).get("/unexpected-error");

    expect(res.status).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("UNKNOWN_ERROR");
    expect(res.body.error.message).toBe("An unexpected error occurred");
  });
});
