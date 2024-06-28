"use client"
import Cookies from "js-cookie";
import { HomeLogo, LeftLogo, LoginLogo, LogoutLogo, RegisterLogo, RightLogo } from "@/Logo";
import { useRouter } from "next/navigation";
import { FunctionComponent, useEffect, useState } from "react";


interface SideBarProps {
    
}
 
const SideBar: FunctionComponent<SideBarProps> = () => {
    const [expand, setExpand]= useState(true)
    const [token, setToken]= useState(null)
    const router= useRouter()
    //console.log(Cookies.get('token'));
   useEffect(()=> {
    //@ts-ignore
      setToken(localStorage.getItem('token'))
   },[])
    const handleLogout= ()=> {
      localStorage.clear()
    }   
    

    return ( 
        <div className={`${expand ? 'w-[15vw]': 'w-fit'} h-[100vh] border-r-[1px] border-white bg-blue-950`}>
        <div className=" flex m-2 flex-col gap-4 items-end cursor-pointer ">
      {
        expand ? <div  onClick={()=> setExpand(false)}> <LeftLogo /></div>: <div onClick={()=> setExpand(true)}> <RightLogo /> </div>
      }
      </div>
    
        {!token ?
          (<div className=" flex mt-8 flex-col gap-8 p-3 ">
              <div onClick={()=> router.push('/')} className=" cursor-pointer flex gap-3 items-center">
                  <HomeLogo />
                  <div className={` ${!expand && 'hidden'} text-[1.4rem] font-medium text-white`}>Home</div>
              </div>
              <div onClick={()=> router.push('/signup')} className=" cursor-pointer flex gap-3 items-center">
                  <RegisterLogo />
                  <div className={` ${!expand && 'hidden'} text-[1.4rem] font-medium text-white`}>Signup</div>
              </div>
              <div onClick={()=> router.push('/signin')} className=" cursor-pointer flex gap-3 items-center">
                  <LoginLogo />
                  <div className={` ${!expand && 'hidden'} text-[1.4rem] font-medium text-white`}>Signin</div>
              </div>
          </div>) :
          (<div className=" flex mt-8 flex-col gap-8 p-3 ">
          <div onClick={()=> router.push('/')} className=" cursor-pointer flex gap-3 items-center">
              <HomeLogo />
              <div className={` ${!expand && 'hidden'} text-[1.4rem] font-medium text-white`}>Home</div>
          </div>
          <div onClick={()=> router.push('/signup')} className=" cursor-pointer flex gap-3 items-center">
              <LogoutLogo />
              <div onClick={handleLogout} className={` ${!expand && 'hidden'} text-[1.4rem] font-medium text-white`}>Logout</div>
          </div>
      </div>)


    }
      </div>
  
     );
}
 
export default SideBar;