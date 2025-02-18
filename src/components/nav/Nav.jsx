import React, { useState } from 'react'
import { Link, useHref, useNavigate,  } from 'react-router-dom'
import {nav} from '../../../data/home.json'
import LogoReg from '../logoReg/LogoReg'
import MobileMenu from '../mobileMenu/MobileMenu'

const Nav = () => {
  const redir = useNavigate();
  const [open,setOpen] = useState(false);
  return (
   <nav className="md:relative sticky top-0 left-0 z-50 ">
    <ul className="">
      <li className="h-[56px] hidden md:flex  lg:h-[49px] flexBetween ps-[85px] lg:ps-[208px] pe-0 lg:pe-[105px] bg-black dark:text-white text-black ">
        <h2 className="text-[24px]"> {nav.title} </h2>
        <div className="flexStart gap-[20px] ">
          <Link className='flexStart  gap-2 hover:bg-mblue2 p-[6px] ' to="/" > 
          <img src={nav.line1.languages.icon} alt={nav.line1.languages.text} />
          <span className="text-mblue3 text-[14px] "> {nav.line1.languages.text} </span>
           </Link>
          <Link className='flexStart gap-2  hover:bg-mblue2 p-[6px] ' to="#" > 
          <img src={nav.line1.user.icon} alt={nav.line1.user.text} />
          <span className="text-mblue3 text-[14px] "> {nav.line1.user.text} </span>
           </Link>
           <form onSubmit={(e)=> {e.preventDefault(); redir('/search')} } >
            <fieldset className='flexStart border-[1px] border-mgray rounded  ' >
              <input className='w-[165px] h-[37px] p-2 bg-transparent ' type="text" name="search" id="search" placeholder={nav.line1.input.placeholder} />
              <button className='w-[35px] h-[37px] border-l-[1px] flexCenter border-l-mgray ' type='submit' > <img src={nav.line1.input.icon} alt="search icon" /> </button>
            </fieldset>
           </form>
        </div>
      </li>
      <li className="h-[49px] hidden md:flex  flexStart gap-[26px] ps-[0px] lg:ps-[208px] bg-mblack dark:text-white text-black">
          {
            nav.line2.map((each,i)=> (
              <Link key={i} className='flexStart p-[10px] hover:bg-black  ' to="#" > 
              <img className='' src={each.icon} alt={each.text} />
               <span className=""> {each.text} </span> 
                </Link>
            ))
          }
      </li>
      <LogoReg />
      <li className=" flexStart flex md:hidden  justify-end h-[56px] gap-[26px] bg-mgray2 "> 
         <img src={nav.mobile.languages} alt="languages" />
         <img onClick={()=> redir('https://www.jw.org/en/search')} src={nav.mobile.search} alt="search" />
         <img onClick={(e)=> setOpen(prev=> !prev)} src={nav.mobile.menu} alt="menu" />
         </li>
      
    </ul>
    <MobileMenu open={open} setOpen={setOpen} />
   </nav>
  )
}

export default React.memo(Nav)