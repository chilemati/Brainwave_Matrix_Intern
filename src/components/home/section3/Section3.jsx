import React from 'react'
import {section3 as sec3} from '../../../../data/home.json' 
import { Link } from 'react-router-dom'

const Section3 = () => {
  return (
    <div className='mt-[22.5px] border-t-[1px] pt-[22.5px] border-t-mgray border-b-mgray border-b-[1px] pb-[73px] ' >
        <h3 className="font-bold font-NotoSans text-[23.2px] "> {sec3.title} </h3>
       <div className="grid grid-cols-1 mt-[23px] md:grid-cols-2 lg:grid-cols-3 place-items-center gap-[20px] ">
       {
            sec3.cards.map((each,i)=> (
                <Link to={each.to} key={i} className="flexStart w-full  relative  md:h-[129px] h-[150px] lg:h-[106px] ">

                    <img loading='lazy' src={each.img} alt={each.text} className=" w-full md:h-[129px] h-[150px] opacity-[0.7] lg:h-[106px]" />
                    <span className="absolute hover:underline top-[70px] left-[16px] font-NotoSans text-base "> {each.text} </span>
                </Link>
            ))
        }
       </div>
       {/* circle cards */}
       <div className="mt-[48px] grid grid-cols-1 md:grid-cols-3 place-items-center gap-[20px] ">
        {
            sec3.cards2.map((each,i)=> (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-[17px] w-full  place-items-center   ">
                    <Link className='w-[220px] mx-auto h-[220px] rounded-full ' to={each.to} >
                    <img loading='lazy' src={each.img} alt={each.text} className="w-[220px] h-[220px] rounded-full  " />
                     </Link>
                   <div className="">
                   <Link to={each.to} className="  block sm:inline md:block hover:underline text-center  text-mblue text-[19px] font-NotoSans "> {each.title} </Link>
                   <p className="font-NotoSans text-base mt-[17px]  w-full text-center  sm:text-start md:text-center  "> {each.text} </p>
                   </div>
                </div>
            ))
        }
       </div>
    </div>
  )
}

export default Section3