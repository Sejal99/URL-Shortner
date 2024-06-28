"use client"
import { FunctionComponent, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface DashboardProps {
    
}

const Dashboard: FunctionComponent<DashboardProps> = () => {
  const router= useRouter()

  const handleClick= ()=> {
    if(localStorage.getItem('token')){
      router.push('/shortner')
    }else{
      router.push('/signin') //push to signin route
    }
  }

return (
      <div className=" flex flex-col items-center ">
        <div className=" font-bold mt-7 text-[2.4rem] font-serif text-white ">Shorten Your Url  :) </div>
        <div className=" w-[30vw] mt-24  shadow-lg pt-10 bg-white flex flex-col items-center p-5 rounded-lg max-h-screen "> 
            <div className=" text-[1.3rem] font-serif text-gray-600"> A cutting-edge URL shortening service that condenses lengthy URLs while harnessing innovative capabilities for in-depth analytics tracking.</div>
            <button onClick={handleClick} className=" m-5 text-[1.1rem] hover:bg-orange-500 rounded-md bg-cyan-500 text-white p-3 font-medium">Get Started</button>
        </div>
       </div> 
      );
}
 
export default Dashboard;