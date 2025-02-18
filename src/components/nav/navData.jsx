import { lazy } from 'react';
const Home = lazy(() => import('../home/Home'));

let id = 0;


export const navList = [
    {
        id: ++id,
        text: "Home",
        component: <Home />,
        to: "/"
    }
    
]