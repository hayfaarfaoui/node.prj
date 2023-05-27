const morgan = require('morgan');
const express = require('express');
const itemsRouter = require('./routers/items');

const ordersRouter = require('./routers/orders');
const usersRouter = require('./routers/users');
const authRouter = require('./routers/auth');
require('dotenv').config();


const fs = require('fs'); 
const https = require('https'); 
const app = express(); 
const mongoose = require('mongoose');

const dburl = process.env.dburl; 


//db coonection 
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(conn => console.log('Connected'))
  .catch(err => console.log(err));


  //json middwileware 

app.use(express.json());

// using routers
app.use('/api/v1/items', itemsRouter);
app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);

app.use(morgan('combined'));

const logger = (req, res, next) => {
  console.log('logging in.....');
  next();
};

app.listen(3000);
