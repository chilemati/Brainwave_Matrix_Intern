import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import useToastify from '../customHooks/useToastify';
import { Link, useNavigate } from 'react-router-dom';
const baseUrl = import.meta.env.VITE_API_PROD

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, "Must Contain 8 Characters").required("Please your password")
  .matches(
    /^(?=.*[a-z])/,
    " Must Contain One Lowercase Character"
  )
  .matches(
    /^(?=.*[A-Z])/,
    "  Must Contain One Uppercase Character"
  )
  .matches(
    /^(?=.*[0-9])/,
    "  Must Contain One Number Character"
  )
  .matches(
    /^(?=.*[!@#\$%\^&\*])/,
    "  Must Contain  One Special Case Character"
  ),
});

 const Signup = () => {
  const {toastContainer,success,dismissAll,info,error} = useToastify()
  const redir = useNavigate();
  return (
  <div className='flexCol gap-1' >
    <h1 className='text-red-700 font-bold text-3xl my-4' >Signup</h1>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        // same shape as initial values
        info('Please Wait...')
      
        let upd = {...values}

        axios.post(baseUrl+'/signup',upd,{headers: {"Access-Control-Allow-Origin": "*","Content-Type": "application/json" }})
       .then(({data})=> {
        if(data.status) {
          dismissAll();
          success('Sucessfull!');
          setTimeout(() => {
           redir('/login');
          }, 5000);
          
        }else{
          error('An Error Occured!')
        }
       })
       .catch(err=> {
        console.log(err)
       })
      }}
    >
      {({ errors, touched }) => (
        <Form className='flex items-center justify-center flex-col gap-4 ' >
          <fieldset>
          <Field className='shadow py-3 px-4 rounded-xl ' placeholder='First Name' name="firstName" />
          {errors.firstName && touched.firstName ? (
            <div className='text-[10px] text-red-700 ' >{errors.firstName}</div>
          ) : null}
          </fieldset>
          <fieldset>
          <Field className='shadow py-3 px-4 rounded-xl ' placeholder='Last Name' name="lastName" />
          {errors.lastName && touched.lastName ? (
            <div className='text-[10px] text-red-700 ' >{errors.lastName}</div>
          ) : null}
          </fieldset>
          <fieldset>
          <Field className='shadow py-3 px-4 rounded-xl ' placeholder='Email' name="email" type="email" />
          {errors.email && touched.email ? <div className='text-[10px] text-red-700 ' >{errors.email}</div> : null}
          </fieldset>
          <fieldset>
          <Field className='shadow py-3 px-4 rounded-xl ' placeholder='password' name="password" type="password" />
          {errors.password && touched.password ? <div className='text-[10px] text-red-700 ' >{errors.password}</div> : null}
          </fieldset>
          <button className='px-4 py-2 my-4 rounded-md border-2 hover:bg-green-700 hover:text-white  ' type="submit">Submit</button>
          <p className="text-base mt-3 "> Have an Account? <Link className="italic font-normal text-2xl text-purple-700  " to='/login' >Login</Link>  </p>
        </Form>
      )}
    </Formik>
    {toastContainer}
  </div>
)};

export default Signup;