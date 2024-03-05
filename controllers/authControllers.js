const user=require("../models/user");
const jwt=require("jsonwebtoken");

//create jwt tokens
const maxAge=60*60*24*3;
const createToken=(id)=>{
    return jwt.sign({id},"Gear504072003",{
        expiresIn:maxAge
    })
}

//handle errors
const handleErrors=(err)=>{
    let errors={email:" ", password:" "};
    console.log(err.message);
    
    if(err.message ==="invalid email"){
        errors.email = "email is not registered";
    }
    if(err.message === "invalid password"){
        errors.password = "incorrect password";
    }

    //handling unique errors
    if(err.code ===11000){
        errors.email="The email is already taken";
        return errors;
    }

    //validating errors
    if(err.message.includes("User validation failed")){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}

const signUp=(req,res)=>{
    res.render('auth/signup',{title:"SignUp"})
}

const signUp_post=async (req,res)=>{
    var body=new user(req.body);
    try{
        const result=await body.save();
        const token=createToken(result.id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000})//cookie shd be in milliseconds
        res.status(201).json({user:result.id});
    }
    catch(err){
        var errors=handleErrors(err);
        res.status(400).json({errors});
    }
    // body.save()
    //     .then((result)=>{
    //         res.send(result);
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //         res.status(400).send("Error,User not created");
    //     })
    
}


const login=(req,res)=>{
    res.render('auth/login',{title:"Login"})
}

const login_post=async (req,res)=>{
    const {email,password}=req.body;
    try{
        const result=await user.login(email,password);
        const token=createToken(result.id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000})//cookie shd be in milliseconds
        res.status(201).json({user:result.id});
        
    }
    catch(err){
        const errors=handleErrors(err);
        res.status(400).json({errors});
    }
}

const logout=(req,res)=>{
    res.cookie("jwt",'',{maxAge:1});
    res.redirect('/login');
}   

module.exports={
    signUp,
    signUp_post,
    login,
    login_post,
    logout
}