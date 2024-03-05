const express= require("express");
const router = express.Router();
const blogControllers =require("../controllers/blogControllers");
const {requiredAuth }=require("../middleware/authMiddleware");

//fetching and rendering data in display
router.get("/",blogControllers.blog_index);

//create get request
router.get("/create",requiredAuth,blogControllers.blog_create);

//POST request handling
router.post("/",requiredAuth,blogControllers.blog_post);

//routing into blog using id 
router.get("/:id",requiredAuth,blogControllers.blog_get_id);

//Delete request handling
router.delete("/:id",requiredAuth,blogControllers.blog_delete);




module.exports= router;