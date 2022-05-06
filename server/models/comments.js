const mongoose=require(`mongoose`)
const Schema=mongoose.Schema

const CommentSchema=new Schema({
    name:{type:String,required:true},
    content:{type:String,required:true},
    date:{type:String,required:true},
    post:[{type:Schema.ObjectId,ref:`Post`}]
})

module.exports=mongoose.model(`Comment`,CommentSchema);
