import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRouter from './routes/authRoutes.js';
import employeRouter from './routes/employeRoutes.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRouter);
app.use('/employe', employeRouter);

app.listen(3000, () => {
  console.log('Server started at 3000');
});
