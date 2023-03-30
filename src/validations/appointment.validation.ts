import { z } from 'zod';
import mongoose from 'mongoose';

import { AppointmentTypes } from '../helper/enums';

export const appointmentSchema = z.object({
    patient: z.string().refine(
        (id) => mongoose.Types.ObjectId.isValid(id),
        { message: 'Patient id is not valid' }
    ),
    doctor: z.string().refine(
        (id) => mongoose.Types.ObjectId.isValid(id),
        { message: 'Doctor id is not valid' }
    ),
    date: z.date(),
    type: z.nativeEnum(AppointmentTypes).optional(),
    meetingLink: z.string().optional(),
    isActive: z.boolean().optional(),
});