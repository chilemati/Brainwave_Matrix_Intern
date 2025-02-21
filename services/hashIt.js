var bcrypt = require('bcryptjs');
require('dotenv').config();
const { SALT} = process.env


const hashIt = (text)=> new Promise(function(accept,reject) {
    bcrypt.hash(text, Number(SALT), function(err, hash) {
            if(err) {
                reject(false)
            }else{
                accept(hash)
            }
    });
})

module.exports=hashIt