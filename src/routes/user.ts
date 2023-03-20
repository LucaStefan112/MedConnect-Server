import { Router } from 'express';
const userRouter = Router();

// controllers
import { getUser, updateUser, register, login } from '../controllers/user.controller';

// routes
userRouter.get('/', getUser);
userRouter.put('/', updateUser);


// For register and login routes (test purposes)
userRouter.post('/register', register);
userRouter.post('/login', login);

export default userRouter;