import jwt from 'jsonwebtoken';

export const generateAccessToken=(userId)=>{
  return jwt.sign({id:userId},process.env.JWT_ACCESS_SECRET,{
    expiresIn:process.env.JWT_ACCESS_EXPIRES,
  });
};

export const generateRefreshToken=(userId)=>{
  return jwt.sign({id:userId},process.env.JWT_REFRESH_SECRET,{
    expiresIn:process.env.JWT_REFRESH_EXPIRES,
  });
};

