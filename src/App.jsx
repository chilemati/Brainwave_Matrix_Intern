import React, { Suspense, lazy } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import { navList } from "./components/nav/navData";

const Error = lazy(() => import("./components/error/Error"));
const Create = lazy(() => import("./components/create/Create"));
// js environment
const App = () => {
  
  return (
    <React.Fragment>
      {/* jsx environment */}
      {/* router: step 2 */}
      <Nav />
      <Suspense fallback={<div className="h-[80vh] flexCenter text-[3rem] text-bold italic text-red-800 " > <img src='/loading.gif' alt="loading gif" loading="lazy" /> </div>} >
      <Routes>
        
        {
          navList.map((each,i)=> (
            
            <Route key={i} path={each.to} element={each.component} />
          ))
        }
        <Route  path='/create' element={<Create />} />
        <Route path="*" element={<Error />} />

      </Routes>
      </Suspense>
      <Footer />
    </React.Fragment>
  );
  // js environment
};
// js environment

export default App;
