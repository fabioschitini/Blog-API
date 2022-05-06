
var express = require('express');
var router = express.Router();
const passport = require("passport");
const userController=require('../controllers/userController')
const postController=require('../controllers/postController')
const commentsController=require('../controllers/commentsController')


/* GET home page. */

router.get('/',(req,res)=>{
  res.json({Welcome:"Welcome to my API"})
});


router.get('/log-in',userController.log_in_get);
router.post(
    "/log-in",
    passport.authenticate("local", { 
      successRedirect: "/log-in",
      failureRedirect: "/log-in",
      failureFlash: true
    })
  );

  router.get('/logout', function (req, res){
    req.session.destroy(function (err) {
      res.redirect('/post'); //Inside a callback… bulletproof!
    });
  });

  router.get("/post",postController.post_create_get);
  router.post("/post",postController.post_create_post);
  router.get("/comments",commentsController.comments_create_get);
  router.post("/comments",commentsController.comments_create_post);
  router.post("/comments/delete",commentsController.comments_delete_post);
  router.post("/post/delete",postController.post_delete_post);
  router.get("/post/:id",postController.post_details_get);
  router.get("/post/update/:id",postController.post_update_get);  
  router.post("/post/update/:id",postController.post_update_post);
  router.get("/comments/:id",commentsController.comments_update_get);
  router.post("/comments/:id",commentsController.comments_update_post);

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
