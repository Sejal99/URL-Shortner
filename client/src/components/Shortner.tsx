
"use client"
import { DeleteLogo } from "@/Logo";
import { BASE_URL } from "@/Secrets";
import { useEffect, useState } from "react";

 
const Shortner= () => {
    const [url, setUrl]= useState("");
    const [shortIds, setShortIds]= useState([])
    const [toggle, setToggle]= useState(false)
    const [getDisable, setDisable]= useState(false)
   

    useEffect(()=> {
        
        const fun= async ()=> {
           
            // const token= localStorage.getItem('token')
         
            const headers = {
                // 'authorization': token,
                'Content-Type': 'application/json' 
              };
            const res= await fetch(`${BASE_URL}/url/getAllUrls`, {
                method:"POST",
                //@ts-ignore
                headers: headers
            });
            if(!res.ok){
                throw new Error("Network problem!")
            }
            const data= await res.json()  
            
           
            setShortIds(data)
            setToggle(false)    
        }
        fun()
    },[getDisable || toggle])

    const handleSubmit = async(e:any)=> {
        e.preventDefault()
        try{
            setDisable(true)
            const res= await fetch(`${BASE_URL}/url/`,{
                method:"POST",
                 //@ts-ignore
                headers:{
                   
                    // "authorization":localStorage.getItem('token'),
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({redirectUrl:url})
            });
            if(!res.ok){
                throw new Error("Network Problem!")
            }
            const data= await res.json()
            setDisable(false)
            setToggle(true)
            setUrl("")
            
            
        }catch(err){
            setDisable(false)
            console.log(err);
            
        }
    }

    //@ts-ignore
    const handleDelete= async(id)=> {
        try{
            const token = localStorage.getItem('token')
            const res= await fetch(`http://localhost:3000/url/remove/${id}`,{
                method:"DELETE",
                //@ts-ignore
                headers:{
                    // 'authorization':token,
                    'Content-Type':"application/json"
                }
            })
            if(!res.ok){
                throw new Error("Network error!")
            }
            const data= await res.json()
            //console.log(data);
            
        }catch(err){
            console.log(err);
            
        }
    }
    
    
    
    return ( 
        <div>
        <form onSubmit={handleSubmit} className=" flex flex-col items-center gap-5">
            <input onChange={(e)=> setUrl(e.target.value)} required placeholder="Enter URL here" className=" w-[30vw] bg-white p-4 rounded-md outline-none" type="text" />
            <button disabled={getDisable} type="submit" className= {`${ getDisable===true ? ' bg-gray-400' : ' bg-purple-800 '} p-3 px-7 w-[10vw] rounded-lg  text-white font-medium`}>Submit</button>
        </form>
        
        <div className="  mt-10 py-4 rounded-lg  items-center  pr-3 flex flex-col gap-3 ">
        
        <div  className=" bg-white mt-[20px]">
  <table className="border-collapse w-full">
    <thead>
      <tr>
        <th className="border border-black p-2">Shortened URL</th>
        <th className="border border-black p-2">View Count</th>
        {/* <th className="border border-black p-2">Remove</th> */}
      </tr>
    </thead>
    <tbody>
      {shortIds.map((val, index) => (
        <tr onClick={()=> setToggle(!toggle)} key={index}>
          <td className="border border-black p-2">
            <a
              target="_blank"
              //@ts-ignore
              href={`${BASE_URL}/${val.shortId}`}
              onClick={()=>setToggle(!toggle)}
              className="underline cursor-pointer text-blue-500"
            >
            {/* @ts-ignore */}
              {`${BASE_URL}/${val.shortId}`}
            </a>
          </td>
          {/* @ts-ignore */}
          <td className="border border-black p-2">{val.visitHistory.length}</td>
          {/* @ts-ignore */}
          {/* <td onClick={()=>handleDelete(val._id)} className="border border-black cursor-pointer p-2"><DeleteLogo /></td> */}
        </tr>
      ))}
    </tbody>
  </table>
</div>

      
        </div>
        </div>
     );
}
 
export default Shortner;