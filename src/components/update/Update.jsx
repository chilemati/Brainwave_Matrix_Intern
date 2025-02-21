import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import useToastify from '../customHooks/useToastify';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { useRecoilValue } from 'recoil';
import { UserAtom } from '../atoms/user';
import ChatEditor from '../editors/ChatEditor';
const baseUrl = import.meta.env.VITE_API_PROD

const SignupSchema = Yup.object().shape({
  body: Yup.string()
    .min(2, 'Too Short!')
    .required('Required'),
  title: Yup.string()
    .min(2, 'Too Short!')
    .required('Required'),
    author: Yup.string()
    .min(2, "Too Short!")
    .max(80, "Too Long!")
    .required("Required"),
 
});

 const Update = ({toggle,setToggle,Data}) => {
  const {toastContainer,success,dismissAll,info} = useToastify()
  const redir = useNavigate();
  const User = useRecoilValue(UserAtom);

  const [body,setbody] = useState(Data.body)
  let [contentErr, setContentErr] = React.useState("");

  const validateContent = (body, errors, setFieldValue, submitForm) => {
    var span = document.createElement("span");
    span.innerHTML = body;
    let text = span.textContent || span.innerText;
    if (text.length <= 2) {
      errors.body = "Required";
      setContentErr("body too short");
      setFieldValue("body", "");
    } else {
      delete errors.body;
      setFieldValue("body", body);
      setContentErr("");
      submitForm();
    }
  };

  return (
  <div className='flexCol gap-1' >
   <p className="flexStart w-full mt-4 ">
   <IoArrowBack className='me-2 ms-4 cursor-pointer text-red-700 font-bold text-3xl ' onClick={()=> setToggle(false) } />
   </p>
  
    <h1 className='text-red-700 font-bold text-3xl w-full flexCenter my-4' >  Update Blog</h1>
    <Formik
      initialValues={{
        title: Data.title,
        body: Data.body,
        author: `${User.data.firstName} ${User.data.lastName}`,
       
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        // same shape as initial values
        info('Please Wait...')
        let upd = {...values,id:Data._id, };

        axios.patch(baseUrl+'/blogs',upd,{headers: {"Access-Control-Allow-Origin": "*" ,"Content-Type": "application/json",token: User.data.token}})
       .then(({data})=> {
         dismissAll();
         success('Sucessfull!');
         setTimeout(() => {
          redir('/');
         }, 5000);
       })
       .catch(err=> {
        console.log(err)
       })
      }}
    >
      {({ errors, touched,setFieldValue,submitForm }) => (
          <Form className="flex items-center px-4 justify-center flex-col gap-4 ">
            <fieldset className=" w-full " >
            <label
                className="text-xl inline-block mt-3 mb-3 text-left  ps-2 font-bold text-pri "
                htmlFor="title"
              >
                Blog Title
              </label>
              <Field
                className="shadow py-3 px-4  block w-full "
                placeholder="Title"
                name="title"
              />
              {errors.title && touched.title ? (
                <div className="text-[10px] text-red-700 ">{errors.title}</div>
              ) : null}
            </fieldset>

            <fieldset className=" w-full " >
            <label
                className="text-xl inline-block mt-3 mb-3 text-left  ps-2 font-bold text-pri "
                htmlFor="author"
              >
                Author
              </label>
              <Field
                className="shadow py-3 px-4  block w-full "
                placeholder="Author"
                name="author"
              />
              {errors.author && touched.author ? (
                <div className="text-[10px] text-red-700 ">{errors.author}</div>
              ) : null}
            </fieldset>
            
            <fieldset className="flexColStart gap-2">
              <label
                className="text-xl inline-block  mt-3 mb-3 text-left  ps-2 font-bold text-pri "
                htmlFor="body"
              >
                Blog Content
              </label>
              <ChatEditor
                id="body"
                name="body"
                label="body"
                value={body}
                setValue={setbody}
              />

              {errors.body && touched.body ? (
                <div className="text-left text-red-700 w-full text-[12px]">
                  {errors.body}
                </div>
              ) : null}
              <div className="text-left text-red-700 w-full text-[12px]">
                {contentErr}
              </div>
            </fieldset>

            <button
              onClick={(e) => {
                validateContent(body, errors, setFieldValue, submitForm);
              }}
              className="px-4 py-2 my-4 rounded-md border-2 hover:bg-green-700 hover:text-white  "
              type="submit"
            >
              Update
            </button>
          </Form>
        )}
    </Formik>
    {toastContainer}
  </div>
)};

export default Update;