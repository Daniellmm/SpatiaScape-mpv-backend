import express from 'express';

import {PORT} from './config/env.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import errorMiddleware from './middlewares/error.middleware.js';
import connecToDatabase from './database/mongodb.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import modelRouter from './routes/model.routes.js';
import paymentRouter from './routes/payment.routes.js';






const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(arcjetMiddleware)


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/models', modelRouter);
app.use('/api/v1/payment', paymentRouter);


app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to SpatiaScape Backend Api')
})

app.listen(PORT, async () => {
    console.log(`Server is running on ${PORT}`);

    await connecToDatabase();
})


export default app;