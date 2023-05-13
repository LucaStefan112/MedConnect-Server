import { Router } from 'express';
const userRouter = Router();

// controllers
import { getUser, updateUser, register, login } from '../controllers/user.controller';

// middlewares
import { validateToken } from '../middlewares/tokenValidation';
import { validateBody } from "../middlewares/bodyValidation";

// validation
import { userSchema } from '../validations/user.validation';

// routes
userRouter.get('/', validateToken, getUser);
userRouter.put('/', validateBody(userSchema), validateToken, updateUser);


// For register and login routes (test purposes)
userRouter.post('/register', register);
userRouter.post('/login', login);

export default userRouter;