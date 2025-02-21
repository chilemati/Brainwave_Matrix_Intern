var bcrypt = require('bcryptjs');



const unHash = (text,hash)=> new Promise(function(accept,reject) {
    bcrypt.compare(text, hash, function(err, res) {
        // res === true
        if(res) {
            accept(true)
        }else{
            accept(false)
        }
    });
})

module.exports=unHash