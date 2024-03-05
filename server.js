const http =require("http");
const fs= require("fs");
const _=require("lodash");
/*Status code:
200 - ok
301 - Resource moved
404 - Not found
500 - Internal server error*/

const server = http.createServer((req,res)=>{
       //lodash
        
        var num=_.random(2,9);
        console.log(num);

        //set header content type
        res.setHeader('Content-Type','text/html');
        

        //Path routing
        let path= './views/';
        switch(req.url){
            case '/':
                path+='index.html';
                res.statusCode = 200;
                break;
            case '/about':
                path+='about.html';
                res.statusCode = 200;
                break;
            case '/about-us':
                //redirect
                res.statusCode = 301;
                res.setHeader('Location','/about');
                res.end();
                break;
            default:
                path+='404.html';
                res.statusCode = 404;
                break;
        }


        //send a html file
        fs.readFile(path,(err,data)=>{
            if(err){
                console.log(err);
                res.end();
            } 
            else{
                res.end(data);
            }
        })
});

server.listen(3000,'localhost',()=>{
    console.log("server is running on port 3000");
})