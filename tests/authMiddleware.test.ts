import authenticate from "../src/api/v1/middleware/authenticate";
import { AuthenticationError } from "../src/api/v1/errors/errors";

// Mock your Firebase config module (not firebase-admin directly)
jest.mock("../config/firebase", () => ({
  auth: {
    verifyIdToken: jest.fn(),
  },
}));

import { auth } from "../config/firebase"; // This uses the mock above

// Helper mocks
const mockRequest = (token?: string) => ({
  headers: token ? { authorization: `Bearer ${token}` } : {},
});

const mockResponse = () => {
  const res: any = { locals: {} };
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext = jest.fn();

describe("🔐 Authentication Middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("✅ Processes valid token", async () => {
    const req: any = mockRequest("validToken");
    const res = mockResponse();

    (auth.verifyIdToken as jest.Mock).mockResolvedValue({
      uid: "123",
      role: "admin",
    });

    await authenticate(req, res, mockNext);

    expect(auth.verifyIdToken).toHaveBeenCalledWith("validToken");
    expect(res.locals.uid).toBe("123");
    expect(res.locals.role).toBe("admin");
    expect(mockNext).toHaveBeenCalledWith(); // no error
  });

  test("🚫 Handles missing token", async () => {
    const req: any = mockRequest();
    const res = mockResponse();

    await authenticate(req, res, mockNext);

    const err = mockNext.mock.calls[0][0];
    expect(err).toBeInstanceOf(AuthenticationError);
    expect(err.message).toMatch(/No token provided/);
    expect(err.code).toBe("TOKEN_NOT_FOUND");
  });

  test("🚫 Handles invalid token", async () => {
    const req: any = mockRequest("invalidToken");
    const res = mockResponse();

    (auth.verifyIdToken as jest.Mock).mockRejectedValue(new Error("Invalid token"));

    await authenticate(req, res, mockNext);

    const err = mockNext.mock.calls[0][0];
    expect(err).toBeInstanceOf(AuthenticationError);
    expect(err.message).toMatch(/Unauthorized/);
  });
});
