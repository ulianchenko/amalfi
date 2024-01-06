import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import config from 'config';
import dotenv from 'dotenv';
// import  mongoose, { Document, Model, Schema, model } from 'mongoose';

// import swaggerUi from 'swagger-ui-express';
// Database
import initDatabase from './db/initDatabase';
// Routes
import routes from './routes'
// // Swagger
// import swaggerSpec from './configs/swagerSpec'

const app = express();
dotenv.config();
const PORT = process.env.PORT || config.get('port') || 8080;
// const PORT: number = 8080;

initDatabase();

// // Serve Swagger UI at /api-docs
// app.use('/api-docs',
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerSpec)
// );

app.use(express.json());
app.use(cors());

app.use('/api', routes);

// // Route for the root URL
// app.get('/', (req: Request, res: Response): void => {
//   res.send('Hello World!');
// });

// Middleware for handling 404 error
app.use((req: Request, res: Response): void => {
  res.status(404).json({ error: 'Not Found' });
});

// Middleware for handling 500 error
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
  next();
});

// Start server on port 8080
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

export default app;