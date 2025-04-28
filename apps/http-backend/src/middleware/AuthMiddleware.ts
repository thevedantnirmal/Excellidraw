import { NextFunction, Request, Response } from "express";
import jwt from '@repo/backend-common/jwt'
import { JWT_SECRET } from "@repo/backend-common/config";
export const AuthMiddleware=(req:Request,res:Response,next:NextFunction)=>{
  
  const {token}=req.headers;
  console.log(token)
  const verifiedToken=jwt.verify(token as any,JWT_SECRET);
  if(!verifiedToken){
      res.status(400).json({
        message:"You need to signin"
      })
      return ;
  }
  // @ts-ignore
  req.userId=verifiedToken.userId
  next()
}