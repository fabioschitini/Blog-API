const mongoose=require(`mongoose`)
const Schema=mongoose.Schema

const UsersSchema=new Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    status:{type:String,required:true},
  }
)

// Virtual for author "full" name.
UsersSchema.virtual('name').get(function() {
    return this.family_name + ', ' + this.first_name;
  });

UsersSchema.virtual(`url`).get(()=>`catalog/games`+this._id)

module.exports=mongoose.model(`Users`,UsersSchema);