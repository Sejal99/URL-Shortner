// import express, { Request,Response, NextFunction } from 'express'

// function restrictTo(roles:string[] = []){ 
//    return function(req:Request, res:Response, next:NextFunction){  //closure
//             if(!req.headers["role"]){
//                 return res.status(401).json('unauthorized user')
//             }
//             const role:any= req.headers["role"]
//             if(!roles.includes(role)){
//                 return res.status(401).json('User not authorize to acess page')
//             }

//             return next()
//     }
// }

// export default restrictTo