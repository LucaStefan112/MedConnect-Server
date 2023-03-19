import { Router } from 'express';
const userRouter = Router();

// controllers
import { getUser, getAppointments, getAnalyses, updateUser, register, login } from '../controllers/user.controller';

// middlewares
import { verifyToken } from '../middlewares/validation';

// routes
userRouter.get('/', verifyToken, getUser);
userRouter.get('/appointments', verifyToken, getAppointments);
userRouter.get('/analyses', verifyToken, getAnalyses);
userRouter.put('/', verifyToken, updateUser);
// For register and login routes (test purposes)
userRouter.post('/register', register);
userRouter.post('/login', login);

export default userRouter;