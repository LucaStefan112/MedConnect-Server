import { Request, Response } from "express";
import { register } from "../controllers/calendar.controller";
import Calendar from "../models/calendar";

jest.mock("../models/calendar", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    save: jest.fn(),
  })),
}));

describe("Calendar Controller", () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {
      body: {
        doctor: "John Doe",
        dates: ["2023-05-01", "2023-05-02"],
      },
    } as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new calendar and return a success message", async () => {
    const saveMock = jest.fn();
    Calendar.prototype.save = saveMock;

    await register(req, res);

    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Calendar created successfully",
    });
  });
});
