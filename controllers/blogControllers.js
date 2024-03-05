//blog_index
//blog_create
//blog_post
//blog_get_id
//blog_delete
const Blog= require("../models/blog");
const User = require("../models/user");
const jwt =require("jsonwebtoken");

const blog_index=(req,res)=>{
    var token=req.cookies.jwt;
    if(token){
        jwt.verify(token,"Gear504072003",async(err,decodedToken)=>{
            if(err){
                console.log(err.message);
            }
            else{
                const userId= decodedToken.id;
                Blog.find({user:userId})
                .then((result)=>{
                    res.render('blog/index',{title:"All blogs",blogs: result})
                })
                .catch((err)=>{
                    console.log(err);
                })
            }
        })
    }
    else{
    res.redirect("/login"); 
    }
}

const blog_post = (req,res)=>{
    var token=req.cookies.jwt;
    if(token){
        jwt.verify(token,"Gear504072003",async(err,decodedToken)=>{
            if(err){
                console.log(err.message);
            }
            else{
                const userId= decodedToken.id;
                const blogData={
                    ...req.body,
                    user:userId,
                };
                const blog=new Blog(blogData);
                blog.save()
                    .then((result)=>{
                        res.redirect("/blogs");
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            }
        })
    }
    else{
    res.redirect("/login"); 
    }
}

const blog_get_id = (req,res)=>{
    Blog.findById(req.params.id)
        .then((result)=>{
            res.render('blog/details',{title:"Details",blog:result});
        })
        .catch((err)=>{
            console.log(err);
        })
}

const blog_delete= (req,res)=>{
    Blog.findByIdAndDelete(req.params.id)
    .then((result)=>{
        res.json({redirect: "/blogs"});
    })
    .catch((err)=>{
        console.log(err);
    })
}

const blog_create=(req,res)=>{
    res.render("blog/create",{title:"Create"});
}


module.exports={
    blog_index,
    blog_post,
    blog_create,
    blog_get_id,
    blog_delete
}