
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
               let expire=5  
               const accessToken=jwt.sign({user},"secretKey",{expiresIn:`${expire}s`})
               console.log(accessToken)
                res.cookie('jwt',accessToken,{
                  maxAge:expire*1000,
                  httpOnly:true
                })
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
    //console.log('bearerrrrrrrrrrrrrrr of the curse', req.headers['cookie'].split('jwt=')[1])
    //const authHeader=req.headers['cookie'].split('=')[1]
//     if(!req.headers['cookie'].includes('jwt=')){
//       return res.json({user:undefined})
//     }
//  else if(req.headers['cookie'].split('jwt=')[1].includes(';')){
//    console.log('includes fuckin ;;;;;;;;;')
//    token=req.headers['cookie'].split('=')[1].split(';')[0]
// }
//  else if(!req.headers['cookie'].split('jwt=')[1].includes(';')){
//   console.log('doesnt includes fuckin ;;;;;;;;;',req.headers['cookie'].split('jwt=')[1])
//    token=req.headers['cookie'].split('jwt=')[1]
// }
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

  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }

  function checkAdminAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
     if(req.user.status==="admin"){
        return res.redirect('/')
     }
    }
    next()
  }


module.exports = router;
