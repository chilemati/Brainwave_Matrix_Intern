import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import ComfirmDiag from "../dialog/ComfirmDiag";
import useToastify from "../customHooks/useToastify";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../atoms/user";
import Update from "../update/Update";
import Fetching from "../fetching/Fetching";
const baseUrl = import.meta.env.VITE_API_PROD;
const webUrl = import.meta.env.VITE_webUrl;
import parse from "html-react-parser";
import ChatEditor from "../editors/ChatEditor";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { BsHandThumbsDown, BsHandThumbsUp, BsSendFill, BsShare } from "react-icons/bs";
import CopyToClipboard from "react-copy-to-clipboard";

const commentSchema = Yup.object().shape({
  comment: Yup.string().min(1, "Too Short!").required("Required"),
});

const Details = () => {
  let { id } = useParams();
  const [blog, setBlog] = useState(null);
  const redir = useNavigate();
  const User = useRecoilValue(UserAtom);
  const [open, setOpen] = useState(false);
  const { toastContainer, success, dismissAll, info, error } = useToastify();
  const [toggle, setToggle] = useState(false);
  let [comment,setComment] = React.useState('')
 let [contentErr, setContentErr] = React.useState("");
 let [sending, setSending] = React.useState(false);

 const validateContent = (comment, errors, setFieldValue, submitForm) => {
  var span = document.createElement("span");
  span.innerHTML = comment;
  let text = span.textContent || span.innerText;
  if (text.length <= 2) {
    errors.comment = "Required";
    setContentErr("comment too short");
    setFieldValue("comment", "");
  } else {
    delete errors.comment;
    setFieldValue("comment", comment);
    setContentErr("");
    submitForm();
  }
};

  useEffect(() => {
    axios
      .get(baseUrl + "/blogs/" + id, { headers: {"Access-Control-Allow-Origin": "*" ,token: User.data.token} })
      .then(({ data }) => {
        if (data.status) {
          setBlog(data.data);
        }
      })
      .catch((err) => {
        error('An error occured!');
      });
  }, []);

  function handleDelete(id) {
    info("Deleting...");
    axios
      .delete(baseUrl + "/blogs", {
        headers: {"Access-Control-Allow-Origin": "*","Content-Type": "application/json" , token: User.data.token },
        data: { id },
      })
      .then(({ data }) => {
        if (data.status) {
          dismissAll();
          success("Blog Deleted Successfully!");
          setTimeout(() => {
            redir("/");
          }, 5000);
        } else {
          dismissAll();
          error("An error occured!");
        }
      })
      .catch((err) => {
        error('An error occured!');
      });
  }

  const handleLike = () => {
    if (!User.isLoggedIn) {
      redir("/login");
    } else  {
      let typeUrl = "/blog_like";
      

      axios
        .post(
          baseUrl + typeUrl,

          {
            token: User.data.token,
            email: User.data.email,
            id: blog._id,
          },

          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        )
        .then((resp) => {
          if (resp.data.status) {
            setBlog(resp.data.data);
          } else {
          }
        })
        .catch((err) => {error('An error occured!')});
    }
  };

  const handleUnLike = () => {
    if (!User.isLoggedIn) {
      redir("/login");
    } else  {
      let typeUrl = "/blog_unlike";
      

      axios
        .post(
          baseUrl + typeUrl,

          {
            token: User.data.token,
            email: User.data.email,
            id: blog._id,
          },

          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        )
        .then((resp) => {
          if (resp.data.status) {
            setBlog(resp.data.data);
          } else {
          }
        })
        .catch((err) => {error('An error occured!')});
    }
  };
  return (
    <>
      {!toggle && (
        <div className="" >
          {blog && (
            <>
            <div className="flexBetween flex-col md:flex-row gap-4 flex-nowrap py-[16px] min-h-[10vh] bg-white px-3  ">
              <div className="flexBetween w-full ">
                <IoArrowBack
                  className="md:me-2 text-[38px] md:ms-4 cursor-pointer "
                  onClick={() => redir("/")}
                />
                <span className="text-[3.5vw] md:text-base text-nowrap" >
                   Author: {blog?.author}{" "}
                </span>{" "}

                <span className="flex ms-4  items-center flex-row gap-2">
                  <span className="flex   cursor-pointer items-center relative flex-row ps-2 ">
                    <BsHandThumbsUp
                      onClick={() => {handleLike();}}
                      className="animate-bounce text-green-700  "
                    />{" "}
                    <span className="text-[20px]  font-normal text-green-700 absolute  top-[-20px] right-[-5px] ">
                      {blog?.like?.length}
                    </span>
                  </span>
                  <span className="flex items-center cursor-pointer relative flex-row ps-2 ">
                    <BsHandThumbsDown
                      onClick={() => handleUnLike()}
                      className=" "
                    />{" "}
                    <span className="text-[20px] font-normal text-pri absolute  top-[-20px] right-[-7px]  ">
                      {blog?.dislike?.length}
                    </span>{" "}
                  </span>
                </span>
              </div>

                <div className="flexBetween min-h-[8vh] w-full  flex-wrap gap-3 ">
                <span className="font-normal inline-block  text-nowrap text-[3.5vw] md:text-base ">
                  Last Updated: {blog?.date}
                </span>
                <span>
                  {" "}
                  <CopyToClipboard
                    text={`${webUrl}/blogs/${blog?._id}`}
                    onCopy={() => {
                      success("Copied to Clipboard!");
                      setTimeout(() => {
                        dismissAll();
                      }, 2000);
                    }}
                  >
                    <BsShare className="text-[3.5vw] md:text-2xl " title="Copy" />
                  </CopyToClipboard>{" "}
                </span>
                </div>

            </div>
            <div className="likeEditor pt-4 ">  
              <h2 className=" text-2xl pt-4 font-bold text-purple-900 text-center my-5 capitalize ">
                {" "}
                {blog.title}{" "}
              </h2>
              <div className="text-base font-normal font-Montserrat w-[95%] mx-auto p-3 border-l-2 border-l-purple-900 ">
                {parse(blog.body)}
              </div>

              
            </div>
            </>
          )}
          {blog && User.data.email === blog.email && (
            <>
              <div className="flexCenter my-5 gap-3 text-3xl ">
                <MdDeleteForever
                  title="Delete Blog"
                  className="hover:text-red-800 "
                  onClick={() => {
                    setOpen(true);
                  }}
                />
                <GrUpdate
                  title="Update Blog"
                  className="hover:text-green-800"
                  onClick={() => {
                    setToggle(true);
                  }}
                />
              </div>
            </>
          )}
          {
            !blog && <Fetching />
          }
          <ComfirmDiag
            open={open}
            setOpen={setOpen}
            action={{ method: handleDelete, id: id }}
          />
          {toastContainer}
        </div>
      )}
      {/* show and add comments */}
      {
        !toggle && 
      <div className="w-full my-4 ">
                  <h2 className="text-xl mt-3 mb-3 text-left  ps-2 font-bold text-pri ">
                    Comments
                  </h2>
                  <div className="flexColStart ps-2 gap-2 w-full likeEditor  ">
                    {blog?.comments?.map((item,i)=> {return  {...item,index:i}} ).sort((a,b)=> b.index - a.index).map((each, i) => (
                      <div
                        key={i}
                        className=" border-b-2 border-b-black w-full rounded-md p-2 "
                      >
                        <div className="flexBetween font-sans font-medium gap-4">
                          <span title={each.name} className="text-[12px]  w-[50px] h-[50px] rounded-full md:hidden flexCenter border-2 border-dotted border-black " >
                            {String(each.name).split(' ')[0][0]}{String(each.name).split(' ')[1][0]}
                          </span>
                          <span className="text-[12px]    rounded-full hidden md:flexCenter  " >
                            {each.name}
                          </span>
                          <span> {each.date} </span>
                        </div>
                        <div className="text-right w-full ">
                         {parse(String(each.content))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Formik
                    initialValues={{
                      comment: "",
                    }}
                    validationSchema={commentSchema}
                    onSubmit={(values, { resetForm }) => {
                      if (!User.isLoggedIn) {
                        redir("/login");
                      } else  {
                        let typeUrl = "/blog_comments";
                       
                        setSending(true);
                        axios
                          .post(
                            baseUrl + typeUrl,
                            {
                              content: values.comment,
                              id: blog._id,
                              name: `${User?.data?.firstName} ${User?.data?.lastName}`,
                            },
                            {
                              headers: { "Access-Control-Allow-Origin": "*","Content-Type": "application/json" },
                            }
                          )
                          .then((resp) => {
                            console.log(resp.data)
                            if (resp.data.status) {
                              setBlog(resp.data.data);
                              setSending(false);
                             setComment('')
                              resetForm();
                            
                            } else {
                              setSending(false);
                            }
                          })
                          .catch((err) => {
                            setSending(false);
                          });
                      }
                    }}
                  >
                    {({
                      errors,
                      touched,
                      values,
                      submitForm,
                      setFieldValue,
                    }) => (
                      <Form className="ps-2 my-4 w-full">
                        <fieldset className="flexColStart gap-2">
                          <label
                            className="text-xl mt-3 mb-3 text-left  ps-2 font-bold text-pri "
                            htmlFor="comment"
                          >
                            Add Comments
                          </label>
                          <ChatEditor
                            id="comment"
                            name="comment"
                            label="comment"
                            value={comment}
                            setValue={setComment}
                          />

                          {errors.comment && touched.comment ? (
                            <div className="text-left text-red-700 w-full text-[12px]">
                              {errors.comment}
                            </div>
                          ) : null}
                          <div className="text-left text-red-700 w-full text-[12px]">
                            {contentErr}
                          </div>
                        </fieldset>
                        <fieldset className="flexEnd w-[90%] mx-auto ">
                          {sending && <Fetching size="15px" />}
                          {!sending && (
                            <button
                              className="mt-5 border border-1 mx-auto  py-1 px-3 rounded hover:bg-green-500 hover:text-white w-[20%] flexCenter "
                              type="submit"
                              onClick={(e) => {
                                validateContent(
                                  comment,
                                  errors,
                                  setFieldValue,
                                  submitForm
                                );
                              }}
                            >
                              <BsSendFill className="text-3xl text-center  " />
                            </button>
                          )}
                        </fieldset>
                      </Form>
                    )}
                  </Formik>
                </div>

      }
      {toggle && (
        <Update toggle={toggle} setToggle={setToggle} Data={blog && blog} />
      )}

      
    </>
  );
};

export default Details;
