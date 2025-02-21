// imports
const express = require('express');
const blogRouter = require('../routes/blog');
const userRouter = require('../routes/user');
const connectDb = require('../services/mongodb');
require('dotenv').config();
var bodyParser = require('body-parser')
const cors = require("cors");
const helmet = require('helmet');

const origin = ["http://localhost:5173","https://cohort4-2024.vercel.app"]; 


const { PORT} = process.env

const app = express();

// middlewares
app.use(cors({ credentials: true, origin: origin })); // allow commuication with FE
app.use(helmet());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/api',[blogRouter,userRouter])


// routes
app.get('/',(req,res)=> {
    res.json({Home: "Home Page"})
})



// start server

connectDb(()=> {
    app.listen(PORT || 4000,()=> {
        console.log(`Listening to requests on port ${PORT} `)
    })

})

