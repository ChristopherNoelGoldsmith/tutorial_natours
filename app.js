const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//MIDDLEWARE----------------------------------------------------------------------------
//middleware refers to somthing that alters data between the request and response
//This basically means, any time you a call is made to the server it will go through
//-the middleware first
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
};

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//ALWAYS be sure to call next in your middleware or it will stall the req res cycle!
app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next();
});

const url = `/api/v1`;

//-----------------------SERVER---------------------------------

app.use(`${url}/tours`, tourRouter);
app.use(`${url}/users`, userRouter);

module.exports = app;