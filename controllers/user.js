const User = require("../models/user");
const hashIt = require("../services/hashIt");
const getToken = require("../services/token");
const unHash = require("../services/unHash");
require("dotenv").config();
const { ROLE, ADMIN_EMAIL } = process.env;

module.exports.user_get = (req, res) => {
  res.json({ data: [] });
};
module.exports.user_signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body; // get required from frontend
  let role = "normal";
  if (email === ADMIN_EMAIL) {
    role = ROLE;
  }
  try {
    let reply = await hashIt(password);
    role = await hashIt(role);
    let upd = { email, password: reply, firstName, lastName, role }; // add to an object
    const toDb = new User(upd); // creating a new model to be saved on db
    toDb
      .save() // saving to db
      .then((resp) => {
        res.json({ status: true, data: resp });
      })
      .catch((err) => {
        res.json({ status: false, msg: "Unable to add user" });
      });
  } catch (error) {
    res.json({ status: false, msg: "unable to hash password or role " });
  }
};
module.exports.user_login = async(req, res) => {
  const { email, password } = req.body;
  let role = 'normal';
  //   use email to get user info
  try {
     let info = await User.findOne({"email": email})
     if(info.email === email) {
        let check = await unHash(password,info.password);
        let checkRole = await unHash(ROLE,info.role);
        console.log(checkRole,role,ROLE)
        if(checkRole) {
            role = ROLE;
        }
        if(check) {
            let data ={role,firstName:info.firstName,lastName:info.lastName,email}
            let token = await getToken(data);
            if(token) {
                // if token is successfull, then update user data
                User.findByIdAndUpdate({'_id':info._id},{token},{returnOriginal:false})
                .then(reply=> {
                    res.json({status: true,msg: "loggin successfull",data:{...data,token}})

                })
                .catch(err=> {

                    res.json({status:false,msg: "error updating token"})
                })

            }else{
                res.json({status:false,msg: "error generating token"})
            }
        }else{

            res.json({status: false,msg: "wrong email or password"}) 
        }
    }else{

         res.json({status: false,msg: "wrong email or password"})
     }
    
  } catch (error) {
    res.json({status: false,msg: "wrong email or password"})
  }
};
module.exports.user_patch = (req, res) => {
  res.json({ msg: "user updated" });
};
module.exports.user_delete = (req, res) => {
  res.json({ msg: "user deleted" });
};
module.exports.user_single = (req, res) => {
  res.json({ msg: {} });
};
