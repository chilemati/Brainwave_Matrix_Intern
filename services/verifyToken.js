var jwt = require('jsonwebtoken');
require('dotenv').config();
const { PRIVATE_JWT_KEY,TIME} = process.env


const verifyToken = (token)=> new Promise(function(accept,reject) {
    jwt.verify(token, PRIVATE_JWT_KEY, function(err, decoded) {
        if(err){
            reject(false)
        }else{
            if(decoded) {
                accept({status:true,decoded})

            }else{
                reject(false)
            }
        }
      });
})

module.exports=verifyToken