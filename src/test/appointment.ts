// Test for the appointment controller using jest and supertest

import request from "supertest";
import app from "../index";

export default class AppointementTest {
  authToken: string | "CALCAL";
  appointmentId: string | "CALCAL";
  setAuthToken(token: string) {
    this.authToken = token;
  }
  async getAll() {
    const response = await request(app)
      .get("/appointments")
      .set("Cookie", [`token=${this.authToken}`]);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.appointments)).toBe(true);
  }

  async add() {
    const newAppointment = {
      patient: "641444ccb84980eb625d2fdf",
      doctor: "64146bc70e79bb51fe2a1cc3",
      date: new Date().toISOString(),
      type: "online",
    };

    const response = await request(app)
      .post("/appointments")
      .send(newAppointment)
      .set("Cookie", [`token=${this.authToken}`]);
    this.appointmentId = response.body.appointment._id;
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("appointment-added");
  }

  async getOne() {
    const response = await request(app)
      .get(`/appointments/${this.appointmentId}`)
      .set("Cookie", [`token=${this.authToken}`]);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.appointment).toBeDefined();
  }

  async deleteOne() {
    const response = await request(app)
      .delete(`/appointments/${this.appointmentId}`)
      .set("Cookie", [`token=${this.authToken}`]);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Deleted appointment");
  }
}
