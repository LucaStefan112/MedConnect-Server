import mongoose from 'mongoose';
import {dbConnect} from '../db/connection';
import { doctorChecker } from '../methods/setSchedule';
import settingSchedule from '../methods/setSchedule';
import { gettingHour } from '../methods/setSchedule';
import { gettingDay } from '../methods/setSchedule';
import { gettingSchedule } from '../methods/setSchedule'

describe("doctorChecker", () => {
    beforeAll(async () => {
        //we connect to the database
        await dbConnect();
    });
    it("should return true if the doctor exists", async () => {
        const id = '641b2d89900aa25346adbd67';
        const result = await doctorChecker(id);
        expect(result).toBe(true);
    });
    afterAll(async () => {
        //we close the connection to the database
        await mongoose.connection.close();
    });
});

describe("settingSchedule", () => {
    beforeAll(async () => {
        //we connect to the database
        await dbConnect();
    });

    it("should create a new schedule if there is no schedule for the doctor", async () => {
        const id_patient1 = '641444ccb84980eb625d2fdf';
        const id1 = '6414c830e7477147fafa87e4'; 
        const date1 = new Date("2023-05-08T15:15:15.000+00:00");
        const result1 = await settingSchedule(id1, date1, id_patient1);
        const check1 = await gettingHour(id1, date1);
        expect(check1).toBe(true);
    });

    it("should update the schedule if there is already a schedule for the doctor", async () => {
        const id_patient2 = '641444ccb84980eb625d2fdf';
        const id2 = '64146bc70e79bb51fe2a1cc3'; 
        const date2 = new Date("2023-05-08T15:15:15.000+00:00");
        const result2 = await settingSchedule(id2, date2, id_patient2);
        const check2 = await gettingHour(id2, date2);
        expect(check2).toBe(true);
    });

    afterAll(async () => {
        //we close the connection to the database
        await mongoose.connection.close();
    });
});

describe("gettingHour", () => {
  beforeAll(async () => {
      //we connect to the database
      await dbConnect();
  });

  it("should return true if there is an appointment at the given hour", async () => {
      const id = '641b2d89900aa25346adbd67'; //careful so that the doctor exists in the user database 
      const date = new Date("2023-05-02T10:30:00.000+00:00");
      const result = await gettingHour(id, date);
      expect(result).toBe(true);
  });

  it("should return false if there is no appointment at the given hour", async () => {
      const id = '641b2d89900aa25346adbd67';
      const date = new Date("2023-05-05T20:25:13.000+00:00");
      const result = await gettingHour(id, date);
      expect(result).toBe(false);
  });

  afterAll(async () => {
      //we close the connection to the database
      await mongoose.connection.close();
  });
});



describe("gettingDay", () => {
    beforeAll(async () => {
      // connect to the database
      await dbConnect();
    });
  
    afterAll(async () => {
      // close the database connection
      await mongoose.connection.close();
    });
  
    it("should return true if there is an appointment on that day", async () => {
      const id = '641b2d89900aa25346adbd67';
      const date = new Date("2023-05-02T10:30:00.000+00:00");
  
      const result = await gettingDay(id, date);
  
      expect(result).not.toBe(null);
    });
  
    it("should return false if there is no appointment on that day", async () => {
      const id = '641b2d89900aa25346adbd67';
      const date = new Date("2023-05-09T15:15:15.000+00:00");
  
      const result = await gettingDay(id, date);
  
      expect(result).toBe(false);
    });
  });

  describe("gettingSchedule", () => {
    beforeAll(async () => {
      // connect to the database
      await dbConnect();
    });
  
    it("should return an array of appointment dates for the given doctor", async () => {
      const id = '641b2d89900aa25346adbd67';
      const result = await gettingSchedule(id);
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
      console.log(result);
    });
  
    afterAll(async () => {
      // close the connection to the database
      await mongoose.connection.close();
    });
  });