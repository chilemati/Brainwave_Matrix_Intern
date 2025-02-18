import React, { Suspense, lazy, useEffect } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import { navList } from "./components/nav/navData";
import Fetching from "./components/fetching/Fetching";
import Redirect from "./components/redirect/Redirect";
import classNames from "classnames";
import { useRecoilValue } from "recoil";
import { themeAtom } from "./components/atoms/theme";

const Error = lazy(() => import("./components/error/Error"));
const App = () => {
  const theme = useRecoilValue(themeAtom);
  useEffect(()=> {

  },[theme])
  return (
    <div className={classNames("",{
      " dark:bg-black ": theme.dark || theme.system,
      " bg-white ": theme.light
    })} >
      <Nav />
      <Suspense fallback={<Fetching />}>
        <Routes>
          {navList.map((each, i) => (
            <Route key={i} path={each.to} element={each.component} />
          ))}
          <Route
            path="/search"
            component={<Redirect url="https://www.jw.org/en/search" />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
};

export default App;
