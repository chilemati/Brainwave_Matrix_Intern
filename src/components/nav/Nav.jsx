import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { navList } from './navData'
import { UserAtom } from "../atoms/user";
import classNames from 'classnames'
import { MdMenu } from 'react-icons/md'
import MobileMenu from "../drawer/MobileMenu";

const Nav = () => {
const [User,setUser] = useRecoilState(UserAtom);
const redir = useNavigate();
const [opend,setOpend] = useState(false)

function handleSignout() {
   setUser({isLoggedIn:false,data:{}})
}

const MenuList =()=> {
  return (
    <>
     {
                navList.map((each,i)=> (
                  <Fragment key={i} >
                  {each.show  && <Link  className={classNames('text-black md:text-white border-b-[1px] border-b-black text-nowrap p-3 block w-full  font-bold hover:underline ',{
                    "hidden": each.name === 'Login' && User.isLoggedIn,
                    "flex": each.name === 'Login' && !User.isLoggedIn,
                    
                  })} to={each.to} > {each.name} </Link> }
                </Fragment>
                ))
               }
                
               {
                User.data.role === 'Admin' || 'normal' &&  <Link  className='text-black border-b-[1px] border-b-black text-nowrap p-3 block w-full md:text-white  font-bold hover:underline ' to="/create"> Create Blog </Link>
               }
               {
                User.isLoggedIn &&  <Link onClick={()=> handleSignout()} className='text-black border-b-[1px] border-b-black text-nowrap p-3 block w-full md:text-white font-bold hover:underline ' to="#"> Signout </Link>
               }
    </>
  )
}

  return (
    <nav className="bg-black sticky top-0 left-0 z-50   ">
        <ul className='flexBetween list-none h-[10vh] px-3  ' >
            <li onClick={()=> redir('/') } className='text-white animate-bounce font-Grypen cursor-pointer font-bold text-[35px] lg:text-[4vw] ' >Amadi Chile </li>
            <li className='hidden md:flexBetween gap-3' >
                {/* router: step 3 */}
               
                <MenuList />
            </li>
            <li className="flex md:hidden">
            <MdMenu onClick={()=> setOpend(true)} className='text-white text-4xl mx-2   ' />
            </li>
        </ul>
        <MobileMenu  menu={<MenuList />} state={opend} setState={setOpend} />
    </nav>
  )
}

export default Nav