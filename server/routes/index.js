
var express = require('express');
var router = express.Router();
const passport = require("passport");
const userController=require('../controllers/userController')
const postController=require('../controllers/postController')
const commentsController=require('../controllers/commentsController')
var Users= require('../models/users');
const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken')
require('dotenv').config()
/* GET home page. */
router.get('/login',authenticateToken,userController.log_in_get);
router.post(
    "/login",(req,res)=>{
      Users.findOne({ username: req.body.username }, (err, user) => {
        try{
          if (!user) {
            console.log("Username not found")
           return res.send({errors:"Username not found"})
          }
          console.log("Indo comparar passwordss")
          bcrypt.compare(req.body.password, user.password, (err, ress) => {
              if (ress) {
                // passwords match! log user in
                console.log("passwords match! log user in")
               //return res.send("Password match, log in")  
               let expire=3600  
               const accessToken=jwt.sign({user},"secretKey",{expiresIn:`${expire}s`})
               console.log(accessToken)
                req.session.jwt=accessToken
           res.json({user:'user'})
              } else {
                // passwords do not match!
                console.log("passwords do not match!")
                return res.send({errors:"Passwords do not match!"})
              }
            })
        }
        catch(err){
          return res.json("Error");
        }
      });
    }
  );

  function authenticateToken(req,res,next){
    let token;
    console.log(req.session,'sessioonnnnnnnnnnnnnnn')
token=req.session.jwt
if(!token) {return res.json({user:undefined})}
jwt.verify(token,"secretKey",(err,user)=>{
    if(err) return res.json({user:undefined})
    req.user=user
    next()
})
}

  router.get('/',(req,res)=>{
    res.json({Welcome:"Welcome to my API"})
  });

  router.get('/logout', function (req, res){
    // req.session.destroy(function (err) {
    //   res.redirect('/post'); //Inside a callback… bulletproof!
    // });
  req.session.jwt=''
    res.cookie("jwt",'',{maxAge:1})
    res.json({user:undefined})
    console.log('loggign out i think')
  });

  router.get("/post",authenticateToken,postController.post_create_get);
  router.post("/post",authenticateToken,postController.post_create_post);
  router.get("/comments",authenticateToken,commentsController.comments_create_get);
  router.post("/comments",authenticateToken,commentsController.comments_create_post);
  router.post("/comments/delete",authenticateToken,commentsController.comments_delete_post);
  router.post("/post/delete",authenticateToken,postController.post_delete_post);
  router.get("/post/:id",authenticateToken,postController.post_details_get);
  router.get("/post/update/:id",authenticateToken,postController.post_update_get);  
  router.post("/post/update/:id",authenticateToken,postController.post_update_post);
  router.get("/comments/:id",authenticateToken,commentsController.comments_update_get);
  router.post("/comments/:id",authenticateToken,commentsController.comments_update_post);


module.exports = router;
