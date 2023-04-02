import { z } from 'zod';

// enums
import { UserRoles } from '../helper/enums';

export const userSchema = z.object({
    fullName: z.string(),
    email: z.string().email(),
    password: z.string().min(3).max(20),
    role: z.nativeEnum(UserRoles),
    dateOfBirth: z.date().optional(),
    phoneNumber: z.string().optional(),
    specialization: z.string().optional(),
});
