import mongoose from 'mongoose';
import {dbConnect} from '../db/connection';
import settingCalendar from "../methods/setCalendar";
import { parserDate } from "../methods/setCalendar";
import {gettingCalendar} from "../methods/setCalendar";

describe("gettingCalendar", () => {
  beforeAll(async () => {
    //we connect to the database
    await dbConnect();
  });

  it("should return null if there is no calendar for the doctor", async () => {
    const id = '64146bc70e79bb51fe2a1cc3'; //careful so that the doctor exists in the user database 
    const result = await gettingCalendar(id);
    expect(result).toBe(null);
  });
  it("should return the calendar if there is one", async () => {
    const id = '6414c830e7477147fafa87e4'; //careful so that the doctor exists in the user database 
    const result = await gettingCalendar(id);
    expect(result).not.toBe(null);
  });

  afterAll(async () => {
    //we close the connection to the database
    await mongoose.connection.close();
  });
});



describe("parserDate", () => {
  it("should return an array of dates", async () => {
    const dateStart = new Date("2023-05-08T17:00:00.000+00:00"); //you can only write hours of type XX:00 or XX:30, otherwise an infinite loop will occur
    const dateFinish = new Date("2023-05-08T18:00:00.000+00:00");
    const result = await parserDate(dateStart, dateFinish);
    expect(result.length).not.toBe(0);
    console.log(result);
  });
});



describe("settingCalendar", () => {
  beforeAll(async () => {
    //we connect to the database
    await dbConnect();
  });

  it("should return true if the calendar was created", async () => { //this test will fail if the calendar was already created, check the database first
    const idDoc = '64146bc70e79bb51fe2a1cc3'; //careful so that the doctor exists in the user database 
    const dateStart = new Date("2023-05-08T17:00:00.000+00:00"); //you can only write hours of type XX:00 or XX:30, otherwise an infinite loop will occur
    const dateFinish = new Date("2023-05-08T18:00:00.000+00:00");
    const result = await settingCalendar(idDoc, dateStart, dateFinish);
    expect(result).toBe(true);
  });

  it("should return null if the calendar was updated", async () => {
    const idDoc = '6414c830e7477147fafa87e4'; //careful so that the doctor exists in the user database 
    const dateStart = new Date("2023-05-08T17:00:00.000+00:00"); //you can only write hours of type XX:00 or XX:30, otherwise an infinite loop will occur
    const dateFinish = new Date("2023-05-08T18:00:00.000+00:00");
    const result = await settingCalendar(idDoc, dateStart, dateFinish);
    expect(result).toBe(null);
  });

  afterAll(async () => {
    //we close the connection to the database
    await mongoose.connection.close();
  });
});