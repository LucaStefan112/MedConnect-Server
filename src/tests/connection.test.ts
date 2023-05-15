import mongoose from "mongoose";
import { dbConnect } from "../db/connection";

jest.mock("mongoose", () => ({
  connect: jest.fn(),
}));

jest.mock("dotenv", () => ({
  config: jest.fn(() => ({
    parsed: { USERNAME: "testuser", PASSWORD: "testpassword" },
  })),
  error: null,
}));


describe("dbConnect", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should connect to the database with the provided connection string", async () => {
    const mockConnect = mongoose.connect as jest.Mock;
    const connectionString =
      "mongodb+srv://testuser:testpassword@db.example.com";

    await dbConnect();

    expect(mockConnect).toHaveBeenCalledWith(connectionString);
    expect(console.log).toHaveBeenCalledWith(
      "Successfully connected to database"
    );
  });

  it("should throw an error if there is an error during database connection", async () => {
    const mockConnect = mongoose.connect as jest.Mock;
    const error = new Error("Database connection failed");

    mockConnect.mockRejectedValue(error);

    await expect(dbConnect()).rejects.toThrow(error);

    expect(mockConnect).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(error);
    expect(console.log).toHaveBeenCalledWith("Failed to connect to database!");
  });

  it("should throw an error if dotenv.config throws an error", async () => {
    jest.mock("dotenv", () => ({
      config: jest.fn(() => {
        throw new Error("dotenv config error");
      }),
      error: new Error("dotenv config error"),
    }));

    const mockConnect = mongoose.connect as jest.Mock;

    await expect(dbConnect()).rejects.toThrow(new Error("dotenv config error"));

    expect(mockConnect).not.toHaveBeenCalled();
  });
});
