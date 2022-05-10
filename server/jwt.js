Users.findOne({ username: req.body.username }, (err, user) => {
    try{
      if (!user) {
        console.log("Username not found")
       return res.send({error:"Username not found"})
      }
      console.log("Indo comparar passwordss")
      bcrypt.compare(req.body.password, user.password, (err, ress) => {
          if (ress) {
            // passwords match! log user in
            console.log("passwords match! log user in")
           //return res.send("Password match, log in")
           console.log(user,'user in hereeeeeeeeeeeeeeeeeeeeeee')
           const accessToken=jwt.sign(user.username,process.env.ACESS_TOKEN_SECRET)
           console.log(accessToken)
        res.json({accessToken:accessToken})
          } else {
            // passwords do not match!
            console.log("passwords do not match!")
            return res.send("Password is incorrect")
          }
        })
    }
    catch(err){
      return res.json("Error");
    }
  });

  function authenticateToken(req,res,next){
      console.log('bearerrrrrrrrrrrrrrr of the curse',req.headers)
      const authHeader=req.headers['authorization']
    const token=authHeader&&authHeader.split(' ')[1]
    if(token===null) return res.sendStatus(403)
   jwt.verify(token,process.env.ACESS_TOKEN_SECRET,(err,user)=>{
       if(err) return res.sendStatus(403)
       req.user=user
       next()
   })
  }