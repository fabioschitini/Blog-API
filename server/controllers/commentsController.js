var Comments= require('../models/comments');
const { body,validationResult } = require("express-validator");
const bcrypt=require("bcryptjs");


exports.comments_create_get=(req,res,next)=>{
    req.body.postId
    Comments.find({}).then(comments=>res.json({comments,errors:[],user:req.user}))
}

exports.comments_create_post=[

    body('name',`Name must not be empty`).trim().isLength({min:1}).escape(),
   body('content',`Content must not be empty`).trim().isLength({min:1}).escape(),
    
    (req,res,next)=>{
       
        const errors=validationResult(req)
       let comment=new Comments({
            name:req.body.name,
           content:req.body.content,
           date:formatedDate(),
           published:false,
           post:req.body.postId
        })
        if( !errors.isEmpty()){
          console.log(errors)
            res.send({comment,errors:errors.array(),user:req.user})
        }
        else{
            comment.save(err=>{
                    if(err){
                        res.send(err)
                        return next(err)}
                    res.status(202).send("Succefully sent")
                })
        }
    }
]

exports.comments_update_get=(req,res,next)=>{
    Comments.findById(req.params.id).then(comments=>res.json({comments,errors:[],user:req.user}))
}

exports.comments_update_post=[

    body('name',`Name must not be empty`).trim().isLength({min:1}).escape(),
   body('content',`Content must not be empty`).trim().isLength({min:1}).escape(),
    
    (req,res,next)=>{
       
        const errors=validationResult(req)
       let comment=new Comments({
            name:req.body.name,
           content:req.body.content,
           date:formatedDate(),
           published:false,
           post:req.body.postId,
           _id:req.params.id
        })
        if( !errors.isEmpty()){
          console.log(errors)
            res.send({comment,errors:errors.array(),user:req.user})
        }
        else{
            Comments.findByIdAndUpdate(req.params.id,comment,{},(err,thecmoment)=>{
                if(err){
                    res.send(err)
                    return next(err)
                }
                else{res.status(202).send("Update com sucesso")}
            })
        }
    }
]

exports.comments_delete_post=(req,res,next)=>{
    if(!req.user){
        return res.send("Need to be an admin to delete comments")
    }
   console.log("should delete mate--------------------------------------------------------------------------------------")
    Comments.findByIdAndDelete(req.body.commentId,err=>{
       if(err){return next(err)}
        else res.status(202).send("deleted with sucees")
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