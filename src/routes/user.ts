import { Router } from 'express';
const userRouter = Router();

// controllers
import { getUser, getAppointments, getAnalyses, updateUser, register, login } from '../controllers/user.controller';

// routes
userRouter.get('/', getUser);
userRouter.get('/appointments', getAppointments);
userRouter.get('/analyses', getAnalyses);
userRouter.put('/', updateUser);
// For register and login routes (test purposes)
userRouter.post('/register', register);
userRouter.post('/login', login);

export default userRouter;