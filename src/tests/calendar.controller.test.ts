import { Request, Response } from 'express';
import { register } from "../controllers/calendar.controller";
import mongoose from 'mongoose';
import {dbConnect} from '../db/connection';

describe('register', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeAll(async () => {
    //we connect to the database
    await dbConnect();
  });

  beforeEach(() => {
    req = {
      body: {
        doctor: '6414c830e7477147fafa87e4',
        dates: ['2023-05-01', '2023-05-02'],
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should create a new calendar and return a success message', async () => {
    await register(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Calendar created successfully',
    });
  }, 10000);

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    //we close the connection to the database
    await mongoose.connection.close();
  });

});