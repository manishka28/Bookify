import jwt from 'jsonwebtoken';

export const authMiddleware=(req,res,next)=>{
  const authHeader=req.headers.authorization||"";
  // console.log(authHeader);
  
  if(!authHeader.startsWith("Bearer ")){
    return res.status(401).json({message:"Unauthorized: No Token"});
  }
  const token=authHeader.split(" ")[1];
  // console.log("Token",token);
  
  try{
    const decoded=jwt.verify(token,process.env.JWT_ACCESS_SECRET);
    // console.log("Decoded",decoded);
    
    req.user={id:decoded.id};
    next();
  }
  catch(err){
    // console.log("errpr",err);
    
    return res.status(401).json({message:"Unauthorized : Token Expired/ Invalid"});
  }
};