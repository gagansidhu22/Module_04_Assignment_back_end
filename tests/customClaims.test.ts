import { setUserRole, getUserClaims } from "../src/api/v1/controllers/adminController";
import admin from "../config/firebase";

// Mock Firebase Admin SDK
jest.mock("../src/config/firebase", () => ({
  auth: jest.fn(() => ({
    setCustomUserClaims: jest.fn(),
    getUser: jest.fn(),
  })),
}));

const mockReq = (body = {}, params = {}) => ({ body, params });
const mockRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Custom Claims Controller", () => {
  it("should set custom claims successfully", async () => {
    const req = mockReq({ uid: "123", role: "officer" });
    const res = mockRes();

    (admin.auth().setCustomUserClaims as jest.Mock).mockResolvedValueOnce({});

    await setUserRole(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining("officer"),
      })
    );
  });

  it("should retrieve user claims successfully", async () => {
    const req = mockReq({}, { uid: "123" });
    const res = mockRes();

    (admin.auth().getUser as jest.Mock).mockResolvedValueOnce({
      uid: "123",
      email: "test@example.com",
      customClaims: { role: "officer" },
    });

    await getUserClaims(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        claims: { role: "officer" },
      })
    );
  });

  it("should handle error when setting role fails", async () => {
    const req = mockReq({ uid: "123", role: "officer" });
    const res = mockRes();

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
