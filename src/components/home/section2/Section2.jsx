import React from 'react'
import {section2} from '../../../../data/home.json'
import { Link } from 'react-router-dom'

const Section2 = () => {
  return (
    <div className='mt-[200px] sm:mt-[100px] pt-[29px] px-[23px] lg:px-[64px]  lg:mt-0' >
        <div className="flexBetween  ">
            <h4 className="font-NotoSans font-bold text-[23px] "> {section2.line1.title} </h4>
            <Link className='text-base font-NotoSans font-normal text-mblue3 py-[6px] px-[8px] hover:bg-mblue2 ' to={section2.line1.btn.to} > {section2.line1.btn.text} </Link>
        </div>
        <div className="mt-[29px] grid grid-cols-1 place-items-center  md:grid-cols-3  gap-[20px] ">
            {
                section2.line2.map((each,i)=> (
                    <div key={i} className=" ">
                        <img className='h-auto  md:h-[162px] border-2 object-cover object-center ' loading='lazy' src={each.img} alt={each.text} />
                        <p className="mt-2 w-full min-h-[51px] text-[19px] font-NotoSans text-mblue3 "> {each.title} </p>
                    </div>
                ))
            }
        </div>
        {/* line 3 */}
        <div className="mt-[76px] gap-[40px] grid grid-cols-1  lg:grid-cols-2 ">
            <div className="flexStart flex-nowrap items-start gap-[15px] border-r-[0px] border-r-mgray lg:border-r-[1px] lg:border-r-mgray ">
               <img src={section2.line3.boxa.img} loading='lazy' alt={section2.line3.boxa.a.text} className="lg:w-[138px] object-center md:w-[259px] w-[50px] h-[50px] md:h-[259px] lg:h-[138px] " /> 
               <div className="pe-[26px] ">
                <Link className='font-NotoSans text-[19px] text-mblue3 ' to={section2.line3.boxa.a.to} > {section2.line3.boxa.a.text} </Link>
                <p className="font-NotoSans text-base dark:text-white text-black"> {section2.line3.boxa.p} </p>
               </div>
            </div>
            <div className="border-t-[1px] pt-[13px] border-t-mgray lg:border-t-[0px] lg:border-t-mgray ">
               <h4 className="font-NotoSans font-bold text-[19.23px] "> {section2.line3.boxb.h4} </h4>
                <Link className='w-[193px] mt-[23px] p-1 h-[40px] bg-mblue dark:text-white text-black flexBetween font-NotoSans font-normal text-[19px] ' to={section2.line3.boxb.a.to} > <span className=" ">{section2.line3.boxb.a.text}</span> <img src="/drop.svg" alt="greater than icon" className="rotate-[-90deg] " /> </Link>
               
            </div>
        </div>
    </div>
  )
}

export default Section2