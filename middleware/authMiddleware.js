const jwt =require("jsonwebtoken");
const User=require("../models/user");
//middleware for authentication  the routes
const requiredAuth=(req,res,next)=>{
    var token=req.cookies.jwt;
    if(token){
        jwt.verify(token,"Gear504072003",(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect("/login");
            }
            else{
                console.log(decodedToken);
                next();
            
            }
        })
    }
    else{
        res.redirect("/login");
    }
}

const checkUser=(req,res,next)=>{
    var token=req.cookies.jwt;
    if(token){
        jwt.verify(token,"Gear504072003",async(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user=null;
                next();
            }
            else{
                const user= await User.findById(decodedToken.id);
                res.locals.user=user;
                next();
            }
        })
    }
    else{
        res.locals.user=null;
        next();
    }
}

module.exports={requiredAuth,checkUser};