import { lazy } from 'react';
const About = lazy(() => import('../about/About'));
const Blogs = lazy(() => import("../blogs/Blogs"));
const Details = lazy(() => import("../details/Details"));
const Login = lazy(() => import("../login/Login"));
const Signup = lazy(() => import("../signup/Signup"));



export const navList = [
   
    {
        name: "Blogs",
        to: "/",
        component: <Blogs />,
        show: true,
    },
    {
        name: "Login",
        to: "/login",
        component: <Login />,
        show: true,
    },
    // {
    //     name: "Create Blog",
    //     to: "/create",
    //     component: <Create />,
    //     show: true,
    // },
  
    {
        name: "Signup",
        to: "/signup",
        component: <Signup />,
        show: false,
    },
    {
        name: "Details",
        to: "/car/:id",
        component: <Details />,
        show: false,
    },
    {
        name: "Details",
        to: "/blogs/:id",
        component: <Details />,
        show: false,
    },
    {
        name: "About",
        to: "/about",
        component: <About />,
        show: true,
    },
    
]