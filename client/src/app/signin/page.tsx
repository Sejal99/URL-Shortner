"use client"
import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import Signin from "@/components/Signin";
import { FunctionComponent } from "react";

interface pageProps {
    
}
 
const page: FunctionComponent<pageProps> = () => {
    return ( 
      <div className=" flex  w-[100vw] bg-slate-200 fixed">
      <SideBar />
       <div className=" flex w-[100vw] h-[100vh] flex-col">
           <Navbar />
           <div className=" flex overflow-auto justify-center bg-gradient-to-bl items-center from-purple-500 to-red-500  gap-36 p-10 h-[100vh] flex-col ">
               <Signin />
           </div>
       </div>
   </div>
     );
}
 
export default page;