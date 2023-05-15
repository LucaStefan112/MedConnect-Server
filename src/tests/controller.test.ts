// Test for the appointment controller using jest and supertest

import request from "supertest";
import app from "../../src/index";
import utils from "../helper/utils";
import { createFalse } from "typescript";
// import AnalysesTest from "./analysis";
// import AppointementTest from "./appointment";

// const analysisTest = new AnalysesTest();
// const appointementTest = new AppointementTest();

describe("Routes test", () => {
  let authToken;
  let appointmentId;

  beforeAll(async () => {
    // Log in as a patient user to get an auth token
    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTQ0NGNjYjg0OTgwZWI2MjVkMmZkZiIsImlhdCI6MTY4MzAwNzA0NH0.-O4Z_wSea9Q_Mk3RIaYEdlJ9dJEVyghodYvMqMXJl-A";
    const response = await request(app).get(`/check-auth/${token}`);

    if (response.headers["set-cookie"]) {
      response.headers["set-cookie"];
      authToken = response.headers["set-cookie"][0].split(";")[0].split("=")[1];

      // analysisTest.setAuthToken(authToken);
      // appointementTest.setAuthToken(authToken);
    } else {
      console.error(
        "Unable to retrieve auth token. Set-cookie header not found."
      );
    }
    // console.log("Tokenul este [" + authToken + "] ---\n");
  });

  it("should get all appointments for a user", async () => {
    const response = await request(app)
      .get("/appointments")
      .set("Cookie", [`token=${authToken}`]);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.appointments)).toBe(true);
  });

  it("should add a new appointment", async () => {
    const newAppointment = {
      patient: "641444ccb84980eb625d2fdf",
      doctor: "64146bc70e79bb51fe2a1cc3",
      date: new Date().toISOString(),
      type: "online",
    };

    const response = await request(app)
      .post("/appointments")
      .send(newAppointment)
      .set("Cookie", [`token=${authToken}`]);
    appointmentId = response.body.appointment._id;
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("appointment-added");
  });

  it("should get a specific appointment", async () => {
    const response = await request(app)
      .get(`/appointments/${appointmentId}`)
      .set("Cookie", [`token=${authToken}`]);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.appointment).toBeDefined();
  });

  it("should delete a specific appointment for a user", async () => {
    const response = await request(app)
      .delete(`/appointments/${appointmentId}`)
      .set("Cookie", [`token=${authToken}`]);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Deleted appointment");
  });

  it("should get all analyses for a user", async () => {
    const response = await request(app)
      .get("/analyses")
      .set("Cookie", [`token=${authToken}`]);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should get an analysis set for a user", async () => {
    const response = await request(app)
      .get("/analyses/645f5a4dcb6ebcdfcb6f6d20")
      .set("Cookie", [`token=${authToken}`]);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should NOT get an analysis set for a user", async () => {
    const response = await request(app)
      .get("/analyses/645f5a4dcb6ebcdfcppb6f6d20")
      .set("Cookie", [`token=${authToken}`]);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });

  it("should add an analysis set for a user", async () => {
    const newAnalysis = {
      name: "test",
      result: 0.9,
      date: new Date().toISOString(),
      person: "641444ccb84980eb625d2fdf",
    };
    const response = await request(app)
      .post("/analyses/register")
      .send(newAnalysis)
      .set("Cookie", [`token=${authToken}`]);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it("should get the user", async () => {
    const response = await request(app)
      .get("/users")
      .set("Cookie", [`token=${authToken}`]);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("User found");
  });

  it("should add an analysis set for a user", async () => {
    const editedUser = {
      fullName: "Ion Popescu",
      phoneNumber: "1234567890",
    };
    const response = await request(app)
      .put("/users")
      .send(editedUser)
      .set("Cookie", [`token=${authToken}`]);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should register a new user", async () => {
    // const hashedPassword = utils.hash256("1234");
    let random = Math.floor(Math.random() * 100000);
    const newUser = {
      fullName: "Doc User",
      email: `test${random}@bubuiala.com`,
      password: "12345",
      phoneNumber: "1111",
      role: "patient",
      specilization: "heart",
    };
    const response = await request(app)
      .post("/users/register")
      .send(newUser)
      .set("Cookie", [`token=${authToken}`]);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should NOT register a new user", async () => {
    // const hashedPassword = utils.hash256("1234");
    const newUser = {
      fullName: "Doc User",
      email: "test@bubuiala.com",
      password: "12345",
      phoneNumber: "1111",
      role: "patient",
      specilization: "heart",
    };
    const response = await request(app)
      .post("/users/register")
      .send(newUser)
      .set("Cookie", [`token=${authToken}`]);

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
  });

  it("should login a user", async () => {
    const newUser = {
      email: "test@bubuiala.com",
      password: "12345",
    };
    const response = await request(app)
      .post("/users/login")
      .send(newUser)
      .set("Cookie", [`token=${authToken}`]);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should get doctors for a specialisation", async () => {
    const specialisationId = "64595d0527a25c01ffac60b9";
    const response = await request(app)
      .get(`/doctors/specialisation/${specialisationId}`)
      .set("Cookie", [`token=${authToken}`]);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should NOT get doctors for a specialisation", async () => {
    const specialisationId = "64595d0527a25c01ffac70b9";
    const response = await request(app)
      .get(`/doctors/specialisation/${specialisationId}`)
      .set("Cookie", [`token=${authToken}`]);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });

  afterAll((done) => {
    done();
  });

  it("should get busy intervals of a doctor", async () => {
    const doctorId = "64146bc70e79bb51fe2a1cc3";
    const response = await request(app)
      .get(`/doctors/${doctorId}/busy-intervals`)
      .set("Cookie", [`token=${authToken}`]);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should get busy intervals of a doctor EMPTY", async () => {
    const doctorId = "641b2d89900aa25346adbd67";
    const response = await request(app)
      .get(`/doctors/${doctorId}/busy-intervals`)
      .set("Cookie", [`token=${authToken}`]);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });

  it("should NOT get busy intervals of a doctor ", async () => {
    const doctorId = "981";
    const response = await request(app)
      .get(`/doctors/${doctorId}/busy-intervals`)
      .set("Cookie", [`token=${authToken}`]);

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
  });
});
