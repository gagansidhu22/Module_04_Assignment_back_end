import request from "supertest";
import app from "../src/app";

jest.mock("firebase-admin", () => ({
  initializeApp: jest.fn(),
  apps: [],
  credential: {
    cert: jest.fn(() => ({})),
  },
  auth: jest.fn(() => ({
    setCustomUserClaims: jest.fn(),
  })),
}));

describe("Loan Application API", () => {
  it("should return a welcome message", async () => {
    const res = await request(app).get("/api/v1/"); // full mounted path
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Loan Application API is running 🚀"); // exact match
  });
  
  // GET all loans
  it("should return all loans", async () => {
    const res = await request(app).get("/api/v1/loans");
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  // GET loan by ID
  it("should return a loan by ID", async () => {
    const res = await request(app).get("/api/v1/loans/1");
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(1);
  });

  // GET loan by invalid ID
  it("should return 404 for non-existing loan", async () => {
    const res = await request(app).get("/api/v1/loans/999");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Loan not found.");
  });

  // POST create loan
  it("should create a new loan", async () => {
    const res = await request(app)
      .post("/api/v1/loans")
      .send({ applicant: "Charlie", amount: 7000, riskLevel: "low" });
    expect(res.status).toBe(201);
    expect(res.body.data.applicant).toBe("Charlie");
  });

  // PUT update loan
  it("should update an existing loan", async () => {
    const res = await request(app)
      .put("/api/v1/loans/1")
      .send({ amount: 8000 });
    expect(res.status).toBe(200);
    expect(res.body.data.amount).toBe(8000);
  });

  // DELETE Loan
  it("should delete a loan", async () => {
    const res = await request(app).delete("/api/v1/loans/2");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Loan deleted successfully.");
  });
});
