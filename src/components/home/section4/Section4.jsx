import React, { useState } from "react";
import { section4 as sec4 } from "../../../../data/home.json";
import { Link } from "react-router-dom";
import "./section4.scss";
import classNames from "classnames";

const Section4 = () => {
    const[right,setRight] =  useState(false);
  const scrolltoHash = function (element_id, dir) {
    const element = document.getElementById(element_id);

    if (dir === "left") {
        element.scrollLeft -= 1250;
        element.classList.remove('slideRight')
        element.classList.add('slideLeft')
        setRight(p=> !p)
        
       
       
    } else {
      element.scrollLeft += 1250;
    element.classList.add('slideRight')
    element.classList.remove('slideLeft');
    setRight(p=> !p)
    }
  };
  return (
    <div className="mt-[30px] pb-[56px] border-b-mgray border-b-[1px] ">
      <div className="flexBetween  ">
        <h4 className="font-NotoSans font-bold text-[23px] "> {sec4.title} </h4>
        <Link
          className="text-base font-NotoSans font-normal text-mblue3 py-[6px] px-[8px] hover:bg-mblue2 "
          to={sec4.a.to}
        >
          {" "}
          {sec4.a.text}{" "}
        </Link>
      </div>
      {/* hero2 */}
      <div id="Section4" className="h-fit mt-[29px]     ">
        <div className="min-h-[459px] sm:h-[460px] relative hero  ">
          <div className=" sm:w-[330px] p-[14px] w-[90%]  left-[5%] sm:left-[7.5vw] min-h-[119px] sm:h-fit absolute bg-[#dbdbdb] sm:bg-transparent top-[350px] sm:top-[72px] lg:w-[365px] ">
            <Link
              to={sec4.hero.a.to}
              className="sm:text-[33.73px] text-[20px] blockw-[90%] sm:w-[28vw] hover:underline   font-bold text-black text-left font-NotoSans "
            >
              {" "}
              {sec4.hero.title}{" "}
            </Link>
            <p className="text-black text-base sm:text-[19.23px] w-[90%] sm:w-[28vw] font-NotoSans mt-[17px] ">
              {" "}
              {sec4.hero.text}{" "}
            </p>
            <Link
              className="font-NotoSans flexStart gap-2 w-fit mt-[32px] text-[12px] sm:text-[20px] bg-mblue py-[5px] px-[10px] dark:text-white text-black "
              to={sec4.hero.a.to}
            >
              <img className="" src="/play.svg" alt="play button" />
              <span className="">{sec4.hero.a.text}</span>
            </Link>
          </div>
        </div>
      </div>
      {/* gallary */}
      <div className="flexBetween gap-4 mt-[150px] sm:mt-[20px] ">
        {/* left buttons */}
        <div className={classNames("w-[40px]  h-[80px] flexCenter hover:bg-mblue2  ",{
            "hidden ": !right,
            "flex ": right,
        })} >
          <img
            onClick={() => {
              scrolltoHash("MyScrollBar", "left");
            }}
            className="rotate-[-270deg] hidden lg:flex "
            src="/drop.svg"
            alt="show more right"
          />
        </div>
        <div
          id="MyScrollBar"
          className="flex  gap-[24px] overflow-x-scroll w-[100%] myScrollBar relative "
        >
          {sec4.cards.map((each, i) => (
            <div key={i} className="relative mt-[24px] ps-[5%] md:ps-0  ">
              <Link to={each.to}>
                <img
                  className=" h-[159px] mb-2 flex-initial mx-auto  max-w-[345px] min-w-[345px] object-cover "
                  loading="lazy"
                  src={each.img}
                  alt={each.title}
                />
                <span className="hover:underline min-h-[51px] font-NotoSans text-[19px] text-mblue3 ">
                  {" "}
                  {each.title}{" "}
                </span>
                <div className="absolute top-[116px] left-0 bg-[#4a14168e] w-[43px] h-[43px] flexCenter ">
                  <img src="/play.svg" alt="" className="play button" />
                </div>
              </Link>
            </div>
          ))}
        </div>
        {/*  right buttons */}
        <div className={classNames("w-[40px] h-[80px] flexCenter hover:bg-mblue2  ",{
            "hidden ": right,
            "flex ": !right,
        })} >
          <img
            onClick={() => {
              scrolltoHash("MyScrollBar", "right");
            }}
            className="rotate-[270deg] hidden lg:flex"
            src="/drop.svg"
            alt="show more right"
          />
        </div>
      </div>
    </div>
  );
};

export default Section4;
