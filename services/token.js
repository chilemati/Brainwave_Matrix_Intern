var jwt = require('jsonwebtoken');
require('dotenv').config();
const { PRIVATE_JWT_KEY,TIME} = process.env


const getToken = (data)=> new Promise(function(accept,reject) {
    jwt.sign(data, PRIVATE_JWT_KEY, { expiresIn:String(Number(TIME)*60000) }, function(err, token) {
        if(err){
            reject(false)
        }else{
            accept(token)
        }
      });
})

module.exports=getToken