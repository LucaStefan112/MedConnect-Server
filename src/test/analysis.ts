import request from "supertest";
import app from "../index";
import cookieParser from "cookie-parser";

export default class AnalysesTest {
  authToken: string | "CALCAL";
  setAuthToken(token: string) {
    this.authToken = token;
  }
  async getAll() {
    const response = await request(app)
      .get("/analyses")
      .set("Cookie", [`token=${this.authToken}`]);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    //  expect(Array.isArray(response.body.appointments)).toBe(true);
  }

  async getOne() {
    const response = await request(app)
      .get("/analyses/645f5a4dcb6ebcdfcb6f6d20")
      .set("Cookie", [`token=${this.authToken}`]);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    // expect(Array.isArray(response.body.analysis)).toBe(true);
  }

  async dontGetOne() {
    const response = await request(app)
      .get("/analyses/645f5a4dcb6ebcdfcppb6f6d20")
      .set("Cookie", [`token=${this.authToken}`]);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    // expect(Array.isArray(response.body.analysis)).toBe(true);
  }
}
