import { FunctionComponent } from "react";

interface NavbarProps {
    
}
 
const Navbar: FunctionComponent<NavbarProps> = () => {
    return ( 
        <div className=" flex items-center justify-center max-h-screen z-20 text-white  w-[100%] h-[7vh] bg-black border-b-[1px] border-white ">
              <div className=" font-semibold font-serif text-[1.4rem] m-3 ">Shorten Your Url</div>  
            </div>
     );
}
 
export default Navbar;