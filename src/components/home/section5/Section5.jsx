import React from 'react'
import {section5 as sec5} from '../../../../data/home.json'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser';

const Section5 = () => {
  return (
    <div className='mt-[33px] ' >
        <h3 className="font-NotoSans ps-[2.5%] mb-[27px] md:ps-0 font-bold text-[20px] md:text-[33.7px] "> {sec5.title} </h3>
        <div className="flexBetween flex-col md:flex-row gap-[30px] items-start  ">
            <div className="w-[95%] mx-auto md:w-[60%]">
                <p className="font-NotoSans dark:text-white text-black text-[14px] md:text-[19px] ">
                    {parse(sec5.boxa.p)}
                </p>
            </div>
            <div className="w-[95%] mx-auto md:w-[40%]  items-start ">
                {
                    sec5.boxb.map((each,i)=> (
                        <Link key={i} className='w-full font-NotoSans text-[14px] md:text-base text-mblue3 hover:underline border-b-mgray border-b-[1px] flexStart py-[15px]  gap-3 ' to={each.to} > 
                          { each.icon && <span className="w-[20px] p-[2px] h-[20px] flexCenter  rounded-full border-mgray border-[1px]"><img className='w-[12px] h-[12px]  ' src={each.icon} alt='play video' /></span> }
                          <span> {each.text} </span>
                         </Link>
                    ))
                }
            </div>
        </div>
            <div className="mt-[21px] grid grid-cols-1 ">
                <img src={sec5.bg} alt="witnesses preaching" className=" " />
            </div>
    </div>
  )
}

export default Section5