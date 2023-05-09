import { Router } from 'express';
const scheduleRouter = Router();

// controllers
import { register } from '../controllers/schedule.controller';

scheduleRouter.post('/register', register);

export default scheduleRouter;