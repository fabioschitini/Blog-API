const mongoose=require(`mongoose`)
const Schema=mongoose.Schema

const PostSchema=new Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    date:{type:String,required:true},
    published:{type:Boolean,required:true},
  }
)

// Virtual for author "full" name.



module.exports=mongoose.model(`Post`,PostSchema);