import isAuthorized from "../src/api/v1/middleware/authorize";
import { AuthorizationError } from "../src/api/v1/errors/errors";

const mockRequest = (params: any = {}, body: any = {}) => ({ params, body });
const mockResponse = (role: string, uid: string) => ({
  locals: { role, uid },
});
const mockNext = jest.fn();

describe("🛡️ Authorization Middleware", () => {
  beforeEach(() => jest.clearAllMocks());

  test("✅ Allows access for users with required roles", () => {
    const req: any = mockRequest();
    const res: any = mockResponse("admin", "123");

    const middleware = isAuthorized({ hasRole: ["admin", "manager"] });
    middleware(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledWith(); // success
  });

  test("🚫 Denies access for users without sufficient role", () => {
    const req: any = mockRequest();
    const res: any = mockResponse("user", "123");

    const middleware = isAuthorized({ hasRole: ["admin", "manager"] });
    middleware(req, res, mockNext);

    const err = mockNext.mock.calls[0][0];
    expect(err).toBeInstanceOf(AuthorizationError);
    expect(err.message).toMatch(/Insufficient role/);
    expect(err.code).toBe("INSUFFICIENT_ROLE");
  });

  test("✅ Allows same-user access when enabled", () => {
    const req: any = mockRequest({ id: "123" });
    const res: any = mockResponse("user", "123");

    const middleware = isAuthorized({ hasRole: ["admin"], allowSameUser: true });
    middleware(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledWith(); // success
  });
});
