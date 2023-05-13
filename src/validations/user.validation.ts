import { z } from 'zod';

// enums
import { UserRoles } from '../helper/enums';

export const userSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    cnp: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    role: z.nativeEnum(UserRoles).optional(),
    dateOfBirth: z.string().optional(),
    sex: z.string().optional(),
    citizenship: z.string().optional(),
    country: z.string().optional(),
    county: z.string().optional(),
    city: z.string().optional(),
    completeAddress: z.string().optional(),
    phoneNumber: z.string().optional(),
    specialization: z.string().optional(),

});
