import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRouter from './routes/authRoutes.js';
import employeRouter from './routes/employeRoutes.js';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRouter);
app.use('/employe', employeRouter);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Admin Panel API Documentation',
      version: '1.0.0',
      description: 'Documentation for your API endpoints',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/',
      description: 'Local development server',
    },
  ],
  apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
