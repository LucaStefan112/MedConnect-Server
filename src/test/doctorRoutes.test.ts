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

  it("should add a new schedule", async () => {
    const newSchedule = {
      doctor: "64146bc70e79bb51fe2a1cc3",
      patients: ["641444ccb84980eb625d2fdf"],
      dates: [new Date().toISOString()],
    };

    const response = await request(app)
      .post("/schedule/register")
      .send(newSchedule)
      .set("Cookie", [`token=${authToken}`]);
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Schedule created successfully");
  });

  // it("should get a specific appointment", async () => {
  //   const response = await request(app)
  //     .get(`/appointments/${appointmentId}`)
  //     .set("Cookie", [`token=${authToken}`]);

  //   expect(response.status).toBe(200);
  //   expect(response.body.success).toBe(true);
  //   expect(response.body.appointment).toBeDefined();
  // });

});
