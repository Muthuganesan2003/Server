const express=require("express");
const auth_router= express.Router();
const authControllers=require("../controllers/authControllers");


auth_router.get("/signup",authControllers.signUp);


auth_router.post("/signup",authControllers.signUp_post);

auth_router.get("/login",authControllers.login);

auth_router.post("/login",authControllers.login_post);

auth_router.get("/logout",authControllers.logout);



module.exports=auth_router;