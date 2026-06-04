import jwt from "jsonwebtoken";
export default function authenticateToken(req,res,next){
    const token=req?.cookies?.token;
   if(!token){
    return res.status(401).json({success:false,message:'Access Denied'});
   }
   jwt.verify(token,process.env.JWTSECRET,(err,user)=>{
    if(err){
        return res.status(403).json({success:false,message:'Invalid Token'});
    }
    req.user=user;
    next();
   })
    
}
