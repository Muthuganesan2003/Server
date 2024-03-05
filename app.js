const express=require("express");
const morgan=require('morgan');
const mongoose=require('mongoose');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require("./routes/blogRoutes");
const cookieParser= require("cookie-parser");
const {requiredAuth,checkUser}=require("./middleware/authMiddleware");
const app=express();


//Database connection
const dbconnect="mongodb+srv://muthuganesan2003:Gear504072003@cluster0.sq3jdtz.mongodb.net/Project_DB?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(dbconnect)
    .then((result)=>{
        console.log("Database connected");
        app.listen(3000,()=>{
            console.log("Server is running on port 3000");
        });
    })
    .catch((error)=>console.log(error));


// middlewares
app.use(cookieParser());

//applying custom middleware for every get request:
app.get("*",checkUser);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(express.json());
app.use("/blogs",blogRoutes);
app.use(authRoutes);

//register view engine
app.set('view engine','ejs');


//basic routes
app.get("/",(req,res)=>{
    res.redirect("/blogs");
})

app.get("/about",requiredAuth,(req,res)=>{
    res.render('blog/about',{title:"About"});
})

//404 
app.use((req,res)=>{
    res.status(404).render('404',{title:"Error"});
})


