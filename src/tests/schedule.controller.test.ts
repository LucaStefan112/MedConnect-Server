import { Request, Response } from 'express';
import Schedule from '../models/schedule';
import { register } from '../controllers/schedule.controller';

describe('register function', () => {
  it('should create a new schedule and return a success response', async () => {
    const req = {
      body: {
        doctor: 'doctor_id',
        dates: ['2023-05-17', '2023-05-18'],
        patients: ['patient_id1', 'patient_id2']
      }
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    jest.spyOn(Schedule.prototype, 'save').mockImplementationOnce(() => Promise.resolve());

    await register(req, res);

    expect(Schedule.prototype.save).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Schedule created successfully'
    });
  });

  it('should handle errors and return an error response', async () => {
    const req = {
      body: {
        doctor: 'doctor_id',
        dates: ['2023-05-17', '2023-05-18'],
        patients: ['patient_id1', 'patient_id2']
      }
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    const error = new Error('Internal server error');
    jest.spyOn(Schedule.prototype, 'save').mockRejectedValueOnce(error);

    await register(req, res);

    expect(Schedule.prototype.save).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Internal server error'
    });
  });
});
