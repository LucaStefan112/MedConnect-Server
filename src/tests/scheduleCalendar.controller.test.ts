import { doctorChecker } from '../methods/setSchedule';
import calendar from '../models/calendar';
import schedule from '../models/schedule';
import modifyingBoth from '../methods/scheduleCalendar.controller';

jest.mock('../methods/setSchedule');
jest.mock('../models/calendar');

describe('modifyingBoth', () => {
  it('should modify the calendar when doctor is found', async () => {
    const mockIdDoc = 'doctorId';
    const mockDate = new Date();

    (doctorChecker as jest.Mock).mockResolvedValueOnce(true);

    const mockCalendar = {
      doctor: mockIdDoc,
      dates: ['Tue May 02 2023 13:30:00 GMT+0300 (Eastern European Summer Time)', 'Tue May 02 2023 13:30:00 GMT+0300 (Eastern European Summer Time)'],
    };

    (calendar.findOne as jest.Mock).mockResolvedValueOnce(mockCalendar);

    await modifyingBoth(mockIdDoc, mockDate);

    expect(doctorChecker).toHaveBeenCalledTimes(1);
    expect(doctorChecker).toHaveBeenCalledWith(mockIdDoc);

    expect(calendar.findOne).toHaveBeenCalledTimes(1);
    expect(calendar.findOne).toHaveBeenCalledWith({ doctor: mockIdDoc });

    expect(mockCalendar.dates).toEqual(['date2']);
  });

  it('should not modify the calendar when doctor is not found', async () => {
    const mockIdDoc = 'doctorId';
    const mockDate = new Date();

    (doctorChecker as jest.Mock).mockResolvedValueOnce(true);

    (calendar.findOne as jest.Mock).mockResolvedValueOnce(null);

    await modifyingBoth(mockIdDoc, mockDate);

    expect(doctorChecker).toHaveBeenCalledTimes(1);
    expect(doctorChecker).toHaveBeenCalledWith(mockIdDoc);

    expect(calendar.findOne).toHaveBeenCalledTimes(1);
    expect(calendar.findOne).toHaveBeenCalledWith({ doctor: mockIdDoc });
  });
});