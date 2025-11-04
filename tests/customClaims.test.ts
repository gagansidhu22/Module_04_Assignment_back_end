// tests/customClaims.test.ts

// ✅ 1. Mock Firebase Admin BEFORE importing your controller
jest.mock("firebase-admin", () => {
  const authMock = {
    setCustomUserClaims: jest.fn().mockResolvedValue(null), // default mock
  };

  return {
    auth: () => authMock,
    apps: [],                  // no initialized apps
    initializeApp: jest.fn(),  // mock initializeApp
    credential: {
      cert: jest.fn(),         // mock cert to prevent errors
    },
  };
});

// 2. Import the controller AFTER mocking
import { setUserRole } from "../src/api/v1/controllers/adminController";

// 3. Mock request and response objects
const mockReq = (body = {}, params = {}) => ({ body, params });
const mockRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// 4. Test suite
describe("Admin Controller - setUserRole", () => {

  it("should set custom claims successfully", async () => {
    const req = mockReq({ uid: "123", role: "officer" });
    const res = mockRes();

    await setUserRole(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining("officer"),
      })
    );
  });

  it("should handle missing uid or role", async () => {
    const req = mockReq({}); // missing body
    const res = mockRes();

    await setUserRole(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining("required"),
      })
    );
  });

  it("should handle Firebase error when setting role fails", async () => {
    const req = mockReq({ uid: "123", role: "officer" });
    const res = mockRes();

    // Force Firebase mock to reject
    const admin = require("firebase-admin");
    (admin.auth().setCustomUserClaims as jest.Mock).mockRejectedValueOnce(
      new Error("Firebase error")
    );

    await setUserRole(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Error setting role",
      })
    );
  });

});
