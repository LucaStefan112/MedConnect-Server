import { Router } from 'express';
const calendarRouter = Router();

// controllers
import { register } from '../controllers/calendar.controller';

calendarRouter.post('/register', register);

export default calendarRouter;