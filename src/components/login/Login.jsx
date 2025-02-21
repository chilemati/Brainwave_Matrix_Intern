import axios from "axios";
import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import useToastify from "../customHooks/useToastify";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserAtom } from "../atoms/user";
const baseUrl = import.meta.env.VITE_API_PROD

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [User,setUser] = useRecoilState(UserAtom);
  const [file, setFile] = useState("");
  const [eye,setEye] = useState('password')
  const {toastContainer,success,dismissAll,info,error} = useToastify()
  const redir = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    info('Please Wait...')
  
    axios.post(baseUrl+'/login',{email,password},{headers: {"Access-Control-Allow-Origin": "*","Content-Type": "application/json" }})
       .then(({data})=> {
        if(data.status) {
          dismissAll();
          success('Sucessfull!');
          setUser({isLoggedIn:true,data:data.data });
          setTimeout(() => {
           redir('/');
          }, 5000);

        }else{
          dismissAll();
          error('Wrong email or password')
          setTimeout(() => {
            dismissAll();
           }, 60000);
        }
       })
       .catch(err=> {
        console.log(err)
       })
  }
  return (
    <div className="flexCol gap-3">
      <h1 className='text-red-700 font-bold text-3xl my-4' >Login</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="flexCol items-start gap-3"
      >
        
        <fieldset className="flex items-start flex-col gap-2 ">
          <label className="text-2xl font-bold " htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your email"
            type="email"
            name="email"
            id="email"
            required
            className="shadow py-3  px-4 rounded-xl "
          />
        </fieldset>
        <fieldset className="flex items-start flex-col gap-2 ">
          <label className="text-2xl font-bold " htmlFor="password">Password</label>
          <span className="flex items-center gap-3 ">
          <input
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
            placeholder="your password"
            type={eye}
            name="password"
            id="password"
            required
            className="shadow py-3 px-4 rounded-xl "
          />
          {
            eye === 'password'?
         <IoMdEye onClick={()=> setEye('text') } />: 
         <IoMdEyeOff onClick={()=> setEye('password') } />
        
          }
          </span>
        </fieldset>
       
        <button className='px-4 py-2 my-4 rounded-md border-2 hover:bg-green-700 hover:text-white mx-auto  ' type="submit">Submit</button>
        <p className="text-base mt-3 "> Don't have an Account? <Link className="italic font-normal text-2xl text-purple-700  " to='/signup' >Signup</Link>  </p>
      </form>
      {toastContainer}
    </div>
  );
};

export default Login;
