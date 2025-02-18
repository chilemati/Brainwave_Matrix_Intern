import React, { useEffect, useRef, useState } from "react";
import { nav } from "../../../data/home.json";
import { VscTriangleUp } from "react-icons/vsc";
import classNames from "classnames";
import { Link } from "react-router-dom";

const MobileMenu = ({ open, setOpen }) => {
  let [data, setData] = useState(nav.mobileList);
  let loaded = useRef(false);
  function handleShowChild(id) {
    let upd = data.map((each, i) => {
      if (id === i) {
        if (each.drop) {
          each.drop = false;
        } else {
          each.drop = true;
        }
      } else {
        each.drop = false;
      }
      return each;
    });
    setData(upd);
  }
  useEffect(()=> {
      let body = document.querySelector('body');
      let getSlideOut = document.querySelector('.myout');
    if(open) {
      body.style.overflow='hidden'
      getSlideOut.style.display='flex'
      loaded.current = true
    }else{
        body.style.overflow='scroll'
        setTimeout(() => {
            getSlideOut.style.display='none'
        }, 950);

    }

  },[open])
  return (
    <div
      onClick={() => {setTimeout(() => {
        setOpen((prev) => !prev);
      }, 1);}}
      className={classNames(
        "w-full h-[100vh] myout bg-[#7f7f7f10]   z-10 absolute   top-[56px] right-0  ",
        {
          [`slideOut    `]: !open,
         "flex slideIn": open,
         "hidden": !loaded.current,
        }
      )}
    >
      {/* triangle on menu */}
      <VscTriangleUp className="absolute top-[-10px]  right-[4px] text-black " />
      <div
        className={classNames(
          "h-[90vh] z-20 lg:w-[490px] w-[350px]       bg-mblack1  fixed  right-0 ",
          {}
        )}
      >
        {/* list */}
        <div className="h-[83vh]  lg:w-[490px] w-[350px] overflow-y-scroll myScrollBar2 ">
        {data.map((each, i) => (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            key={i}
            className="ps-[15px] myScrollBar2   "
          >
            <Link
              onClick={(e) => {
                e.stopPropagation();
                handleShowChild(i);
              }}
              className="flexBetween  bg-[#121212] py-[12px] px-[10px] "
              to={each.to}
            >
              <span className="flexStart gap-3">
                <img className=" " src={each.icon} alt={each.text} />
                <span className="text-mblue3 text-base uppercase ">
                  {" "}
                  {each.text}{" "}
                </span>
              </span>
              {each.children && (
                <div
                  className={classNames(
                    "w-[30px] h-[30x] flexCenter p-[3px] bg-black ",
                    {}
                  )}
                >
                  <img
                    className={classNames("", {
                      "rotate-0 transition delay-150 duration-300 ease-in-out ":
                        !each.drop,
                      "rotate-180 transition delay-150 duration-300 ease-in-out  ":
                        each.drop,
                    })}
                    src="/drop.svg"
                    alt="show more"
                  />
                </div>
              )}
            </Link>
            {/* children list */}
            {each.drop && each.children &&
              each.children.map((item, j) => (
                <div key={j} className="ps-[35px] ">
                  <Link
                    className="flexBetween  bg-[#121212] py-[12px] px-[10px] "
                    to={item.to}
                  >
                    <span className="flexStart gap-3">
                      <img className=" " src={item.icon} alt={item.text} />
                      <span className="text-mblue3 text-base uppercase ">
                        {" "}
                        {item.text}{" "}
                      </span>
                    </span>
                  </Link>
                </div>
              ))}
          </div>
        ))}
        </div>
       
        {/* close div */}
        <div className="h-[46px]  lg:w-[489px] w-[350px]  bg-mgray3 flexStart justify-end ">
          <div className="w-[50px] h-[46px] bg-mgray4 p-[13px] ">
            <img
              onClick={(e) => {
                e.stopPropagation();
                setOpen((prev) => !prev);
              }}
              className=" flexCenter "
              src="/close.svg"
              alt="close menu"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MobileMenu);
