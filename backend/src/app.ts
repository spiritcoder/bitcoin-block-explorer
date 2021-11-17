import express,{ Express } from 'express';

import 'express-async-errors' //for catching async errrors in express
import { json } from 'body-parser';
import cors from 'cors';


// //require those route and error handlers which I created seperately
import { placeRoutes } from './routes/block';
import { errorHandler, NotFoundError } from './errors/error-handler'

const app: Express = express();
app.set('trust proxy', true)
app.use(json());
app.use(cors());

//Routes imported here
app.use('/api/block',placeRoutes);

app.all('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)


export {app}