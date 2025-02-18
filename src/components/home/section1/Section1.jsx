import React from 'react';
import {section1} from '../../../../data/home.json'
import './section1.scss'
import { Link } from 'react-router-dom';

const Section1 = () => {
  return (
    <div id='Section1' className='h-fit    ' >
       <div className="min-h-[380px] relative hero">
       <div className=" md:w-[330px] p-4 w-[90%] left-[5%] sm:left-[4vw] md:left-0 min-h-[119px] md:h-fit absolute bg-[rgb(58,57,59,0.5)] md:bg-transparent top-[344px] md:top-[119px] lg:w-[365px] ">
        <h3 className="sm:text-[34px] text-[20px] mb-3 font-bold text-pretty font-NotoSans "> {section1.title} </h3>
        <Link className='font-NotoSans mt-[6px] text-[12px]  sm:text-[20px] bg-mblue py-[5px] px-[10px] dark:text-white text-black ' to={section1.btn.url} > {section1.btn.text} </Link>
       </div>
       </div>
    </div>
  )
}

export default Section1