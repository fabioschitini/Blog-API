var Users= require('../models/users');
const { body,validationResult } = require("express-validator");
const bcrypt=require("bcryptjs");

exports.log_in_get=(req,res,next)=>{
    let err=req.flash("error")
    //console.log("flashhhhhhhh",req.user)
    Users.find({}).then(user1=> res.send({errors:err,user:req.user}))
   // console.log("flashhhhhhhhhhhhhh",req.flash("error")[0])
    if(req.user){
        console.log('req.user')
    }
}


