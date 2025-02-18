import React, { useState } from 'react'
import {footer} from '../../../data/home.json'
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import ThemeDiag from '../ThemeDiag/ThemeDiag';

const Footer = () => {
   const [open,setOpen] = useState(false);
  return (
    <footer className='min-h-[583px] bg-[#292929] pt-[42px]  dark:text-white text-black mx-[5px] md:px-[50px] lg:mx-[105px] ' >
     <div className="flexBetween flex-wrap ps-[5%] md:ps-0 ">
     <h3 className="text-[14px]  font-normal "> {parse(footer.title)} </h3>
     <button onClick={()=> {setOpen(true)} } className="flexBetween gap-2 shadow hover:bg-mblue2 p-2 ">
      <img src="/sun.svg" alt="switch themes" />
      <span className="text-[14px] text-mblue3 ">Appearance Settings </span>
     </button>
     </div>
     {/* links */}
     <div className="flex gap-[30px] mt-[29px] ">
      <div className="max-w-[13vw] min-w-[13vw] hidden md:block  ">
        {
          footer.boxa.map((each,i)=> (
            <Link key={i} className={classNames('font-NotoSans block capitalize text-[14px] pb-[14px] text-mblue3 hover:underline ',{
              "border-b-[1px] border-b-mgray border-dotted mb-2 ": i==0,
            })} to={each.to} > {parse(each.text)} </Link>
          ))
        }
      </div>
      <div className="max-w-[13vw] min-w-[13vw] hidden md:block ">
      {
          footer.boxb.map((each,i)=> (
            <Link key={i} className={classNames('font-NotoSans block capitalize text-[14px] pb-[14px] text-mblue3 hover:underline ',{
              "border-b-[1px] border-b-mgray border-dotted mb-2 ": i==0,
            })} to={each.to} > {parse(each.text)} </Link>
          ))
        }
      </div>
      <div className="max-w-[13vw] min-w-[13vw] hidden md:block ">
      {
          footer.boxc.map((each,i)=> (
            <Link key={i} className={classNames('font-NotoSans block capitalize text-[14px] pb-[14px] text-mblue3 hover:underline ',{
              "border-b-[1px] border-b-mgray border-dotted mb-2 ": i<=1,
            })} to={each.to} > {parse(each.text)} </Link>
          ))
        }
      </div>
      <div className="md:max-w-[30%] md:min-w-[30%] w-[90%] mx-auto   ">
        <h6 className="font-NotoSans text-[14px] pb-[14px] ">Quick Links</h6>
        {/* cell1 */}
        <div className="border-b-[1px] pt-[14px] grid grid-cols-1 lg:grid-cols-2 border-b-mgray border-t-[1px] border-t-mgray border-dotted">
        {
          footer.boxd.cell1.map((each,i)=> (
            <Link key={i} className={classNames('font-NotoSans block  capitalize text-[14px] pb-[14px] text-mblue3 hover:underline ',{
              " mb-2 ": i<=1,
            })} to={each.to} > {parse(each.text)} </Link>
          ))
        }
        </div>
        {/* cell2 */}
        <div className="border-b-[1px] pt-[14px] grid grid-cols-2 border-b-mgray  border-dotted">
        {
          footer.boxd.cell2.map((each,i)=> (
            <Link key={i} className={classNames('font-NotoSans flexStart  capitalize text-[14px] pb-[14px] text-mblue3 hover:underline ',{
              " mb-2 ": i<=1,
            })} to={each.to} > <img loading='lazy' src={each.icon } alt={parse(each.text)} className="" />  <span className="">{parse(each.text)}</span> </Link>
          ))
        }
        </div>
        {/* cell3 */}
        <div className="border-b-[1px] pt-[14px] grid grid-cols-1 lg:grid-cols-2 gap-[10px] border-b-mgray  border-dotted">
        {
          footer.boxd.cell3.map((each,i)=> (
            <Link key={i} className={classNames('font-NotoSans flexStart  capitalize text-[14px] pb-[14px] text-mblue3 hover:underline ',{
              " mb-2 ": i<=1,
            })} to={each.to} > <img loading='lazy' src={each.icon } alt={parse(each.text)} className="" />  <span className="">{parse(each.text)}</span> </Link>
          ))
        }
        </div>
      </div>
     </div>
     <div className="pt-[50px] pb-[76px] ">
      <p className="font-NotoSans text-[14px] px-[5%] text-center "> {parse(String(footer.last).replace('getFullYear()',new Date().getFullYear()))} </p>
     </div>
       {
        open &&
        <ThemeDiag open={open} setOpen={setOpen} />
       }
    </footer>
  )
}

export default Footer