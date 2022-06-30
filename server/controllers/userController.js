var Users= require('../models/users');
const { body,validationResult } = require("express-validator");
const bcrypt=require("bcryptjs");

exports.log_in_get=(req,res,next)=>{
    console.log(req.user,'userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrnammmmmmmeee')
    res.json({user:req.user})
}


