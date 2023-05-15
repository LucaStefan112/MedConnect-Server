import mongoose from "mongoose";
import { dbConnect } from "../db/connection";

describe("dbConnect", () => {
  it("should connect to the database successfully", async () => {
    const logSpy = jest.spyOn(console, 'log');

    await dbConnect();

    expect(logSpy).toHaveBeenCalledWith('Successfully connected to database');
  });

  it("should throw an error if the connection fails", async () => { //if you want to see this test fail, change the info in .env to something else
    const logSpy = jest.spyOn(console, 'log');

    await dbConnect();

    expect(logSpy).toHaveBeenCalledWith('Failed to connect to database!');
  });
});