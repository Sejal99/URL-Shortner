"use client"
import Dashboard from "../components/Home";
import Navbar from "@/components/Navbar";
import Shortner from "@/components/Shortner";

import { useState } from "react";


export default function Home() {
  
  return (
    <div className=" flex  w-[100vw] bg-slate-200 fixed">
  
     <div className=" flex w-[100vw] h-[100vh] flex-col">
         <Navbar />
         <div className=" flex overflow-auto bg-gradient-to-bl from-purple-500 to-red-500  gap-36 p-10 h-[100vh] flex-col ">
             <Shortner />
         </div>
     </div>
 </div>
  );
}


