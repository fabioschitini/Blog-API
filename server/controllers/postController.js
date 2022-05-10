var Post= require('../models/post');
const { body,validationResult } = require("express-validator");
const bcrypt=require("bcryptjs");
var Comments= require('../models/comments');


exports.post_create_get=(req,res,next)=>{
    console.log('req userrrrrrrrrrrrrrrr',req.user)
    Post.find({}).then(post=>res.json({post,errors:[],user:req.user}))
}

exports.post_create_post=[
   
    body('title',`Title must not be empty`).trim().isLength({min:1}).escape(),
   body('content',`Content must not be empty`).trim().isLength({min:1}).escape(),
    
    (req,res,next)=>{
        if(!req.user){
           return res.send("Need to be logged in to submit post")
        }
        console.log('Should not appear if not logged in')
        const errors=validationResult(req)
       let post=new Post({
            title:req.body.title,
           content:req.body.content,
           date:formatedDate(),
           published:req.body.status
        })  
        if( !errors.isEmpty()){  
          console.log(errors)
            res.send({post,errors:errors.array(),user:req.user})
        }
        else{
                post.save(err=>{
                    if(err){
                        res.send(err)
                        return next(err)}
                    res.status(202).send("Succefully sent")
                })
        } 
    }
]


exports.post_details_get=(req,res,next)=>{
    console.log(req.user)
    Post.findById(req.params.id).then(post=>res.send({post,errors:[],user:req.user}))
}   


exports.post_update_get=(req,res,next)=>{
    Post.findById(req.params.id).then(post=>res.send({post,errors:[],user:req.user}))
}

exports.post_update_post=[

    body('title',`Title must not be empty`).trim().isLength({min:3}).escape(),
   body('content',`Content must not be empty`).trim().isLength({min:3}).escape(),
    
    (req,res,next)=>{
         if(!req.user){
             console.log("Need to be logged in to submit post")
            return res.send("Need to be logged in to submit post")
         }
        const errors=validationResult(req)
        let post=new Post({
            title:req.body.title,
           content:req.body.content,
           date:formatedDate(),
           published:req.body.status,
           _id:req.params.id
        })
        if( !errors.isEmpty()){
          console.log(errors)
            res.send({post,errors:errors.array(),user:req.user})
        }
        else{
            Post.findByIdAndUpdate(req.params.id,post,{},(err,theposst)=>{
                if(err){
                    res.send(err)
                    return next(err)
                }
                else{
                    console.log("update com sucessoooo")
                    res.status(202).send(theposst)}
            })
        }
    }
]

exports.post_delete_post=(req,res,next)=>{
  
    if(!req.user){
        return res.send("Need to be logged in to submit post")
     }

    Post.findByIdAndDelete(req.body.postId,err=>{
         if(err){return next(err)}
        else {
            Post.find({}).then(result=>res.json(result))
            console.log("post deleted with sucesse")
            req.body.comment.map(coment=>{ Comments.findByIdAndDelete(coment._id,err=>{
                if(err){return next(err)}
                // else res.status(202).send("deleted with sucees")
                 console.log("comments deleted with sucesses")
             })
            })
            //res.status(202).send("deleted with sucees")

        }
     })
}


function formatedDate(){

    var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
  
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var today = dd + '/' + mm + '/' + yyyy;
        return today
}