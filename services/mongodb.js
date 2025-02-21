const mongoose = require('mongoose');
require('dotenv').config();

const { MONGODB_URL} = process.env



const connectDb = (cb)=> {
    mongoose.connect(MONGODB_URL)
    .then((resp) => {
        if(resp.STATES.connected === 1) {
            console.log('Connected to mongoDb!');
            cb();

        }else{
            console.log('Mongodb could not connect properly!')
        }
    })
    .catch(err=> {
        console.log('An Error Occured while connecting to Db...')
    })
    ;
}

module.exports= connectDb;