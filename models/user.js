const mongoose=require("mongoose");
const{isEmail}= require('validator');
const bcrypt = require("bcrypt");
const userSchema=mongoose.Schema({
    firstname:{
        type:String,
        required: [true,"Please enter the firstname"]
    },
    lastname:{
        type:String,
        required: [true,"Please enter the lastname"]
    },
    email:{
        type:String,
        required:[true,"Please enter an email"],
        unique:true,
        lowercase:true,
        validate:[isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"please enter an email"],
        minlength :[8,"Minimum password length is 8 characters"]
    }

    
},{timestamps:true})

userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
})

//compare password and sent user using static method
userSchema.statics.login= async function (email,password){
    const user= await this.findOne({email});
    if(user){
        const auth= await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error("invalid password");
    }
    throw Error("invalid email");
}

const user=mongoose.model('User',userSchema);
module.exports=user;