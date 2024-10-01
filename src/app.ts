import express from 'express';
const app = express();

import cors from 'cors';
import inflationRoute from './routes/inflation';
import latestRoute from './routes/latest';
import { errorController } from './controllers/error';

app.use(cors());
app.use(express.json());
app.use('/inflation', inflationRoute);
app.use('/latest', latestRoute);
app.use(errorController);

app.listen(80);
