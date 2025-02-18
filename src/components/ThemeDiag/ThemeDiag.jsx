import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { themeAtom } from '../atoms/theme'

const ThemeDiag = ({open,setOpen}) => {
    const [theme,setTheme] = useRecoilState(themeAtom);
    // const [checked,setChecked] = useState({
    //     system:true,
    //     dark: false,
    //     light:false
    // })
    function handleChange(e) {
     setTheme(e.target.value);
      if(e.target.value === 'system') {
        setTheme({
            system:true,
            dark: false,
            light:false
        })
        // setOpen(false)
      }
      if(e.target.value === 'dark') {
        setTheme({
            system:false,
            dark: true,
            light:false
        })
        // setOpen(false)
      }
      if(e.target.value === 'light') {
        setTheme({
            system:false,
            dark: false,
            light:true
        })
        // setOpen(false)
      }
    }
  return (
    <div onClick={()=> {setOpen(p=> !p)}} className='w-full h-[100vh] fixed top-0 left-0 flexCenter bg-[rgb(20,20,20,0.4)] ' >
        <div className=" w-[247px] h-[188px] bg-[#121212] shadow   ">
            <div className="flexBetween h-[50px] ">
                <span className="font-NotoSans font-bold flexCenter text-base w-[80%] h-[50px] bg-[#3c3c3c] "> Appearance Settings </span>
                <span className="w-[20%] h-[50px] flexCenter bg-[#343434] "> <img onClick={(e)=>{e.stopPropagation(); setOpen(p=> !p)}} src="/close.svg" alt="close" className="" /> </span>
            </div>
            <form className='pt-[20px] ps-[20px]  ' onSubmit={(e)=> {e.preventDefault(); e.stopPropagation()}} >
                <fieldset onClick={(e)=> {e.stopPropagation()}} className='flexStart mb-[7px] gap-[10px] ' >
                    <input value='system' checked={theme.system} onChange={(e)=> {handleChange(e)}} type="radio" name="them" id="system" className='w-[20px] accent-mblue3 h-[20px] '  />
                    <label className='font-NotoSans text-base ' htmlFor="system">System</label>
                </fieldset>
                <fieldset onClick={(e)=> {e.stopPropagation()}} className='flexStart mb-[7px] gap-[10px] ' >
                    <input value='light' checked={theme.light} onChange={(e)=> {handleChange(e)}} type="radio" name="them" id="light"  className='w-[20px] accent-mblue3 h-[20px] ' />
                    <label className='font-NotoSans text-base ' htmlFor="light">Light</label>
                </fieldset>
                <fieldset onClick={(e)=> {e.stopPropagation()}} className='flexStart mb-[7px] gap-[10px] ' >
                    <input value='dark' checked={theme.dark} onChange={(e)=> {handleChange(e)}} type="radio" name="them" id="dark"  className='w-[20px] accent-mblue3 h-[20px] ' />
                    <label className='font-NotoSans text-base ' htmlFor="dark">Dark</label>
                </fieldset>
            </form>
        </div>
    </div>
  )
}

export default ThemeDiag