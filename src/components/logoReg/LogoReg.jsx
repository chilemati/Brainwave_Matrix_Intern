import React from 'react'
import { Link } from 'react-router-dom'

const LogoReg = () => {
  return (
    <Link className=" flexBetween gap-[2px] w-[75px] lg:w-[103px] lg:h-[80px] h-[56px] bg-transparent absolute top-0 left-0 lg:left-[105px]   " to='/' >
    <span className="flexCol  h-[56px] lg:h-[80px] items-center bg-mblue dark:text-white text-black font-NotoSans text-base lg:text-[24px] w-[80%] ">
      <span className="">JW</span>
      <span className="">.ORG</span>

    </span>
    <span className="self-end w-[20%] text-center text-mblue lg:dark:text-white text-black "> &reg;  </span>
   
    </Link>
  )
}

export default LogoReg