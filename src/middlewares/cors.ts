import cors from 'cors';

export default cors({
  origin: 'http://localhost:3003',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});