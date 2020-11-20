const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
require('dotenv').config();

const app = express();
config.express(app)
config.routes(app)

mongoose.connect(process.env.DB_CONN, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    })
    .then(() => app.listen(
        process.env.PORT,
        () => console.log(`Server run on port ${process.env.PORT}`)
    ))
    .catch(() => console.error('Error connecting to database'))