import * as express from 'express';
import * as bodyParser from 'body-parser';
import { router as authRouter } from './routes/Auth';

const app = express();
app.use(bodyParser.json());
app.use('/auth', authRouter);

export { app };