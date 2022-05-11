import { useState,useEffect } from 'react'
import Axios from 'axios'
import { useNavigate } from "react-router-dom";

//const instance = Axios.create({
  //  withCredentials: true,
   // baseURL: "http://localhost:3001",
    
  //})

  const instance = Axios.create({
    baseURL: 'https://blooming-peak-71078.herokuapp.com'
  });

const Login = (props) => {
    const navigate = useNavigate();

    const [errorMessage,setErrorMessage]=useState('')
    const [username,setUserName]=useState('')
    const [password,setPassword]=useState('')

    

    function onSubmit(e){
        e.preventDefault()
        console.log("Submiting")
        instance.post("/login",{username,password}).then(result=>{
            if(result.data.errors){
                setErrorMessage(result.data.errors)
            }

            else {
              console.log("login result",result.data.user)
              props.setUserData(result.data.user)
              navigate("/")
            }
        })
    } 
    return (
        <div>
          <header className='speaker-form-header'>
      <h1>Admin login </h1>
    </header>
<form className='speaker-form' onSubmit={onSubmit}>
<div className='form-row'>
        <label forhtml='nome'>Username</label>
        <input id='nome'  required value={username} type='text' onChange={(e) => setUserName(e.target.value)}/>
      </div>
      <div className='form-row'>
        <label forhtml='password'>Password</label>
        <input id='password'  required value={password} type='password' onChange={(e) => setPassword(e.target.value)}/>
      </div>
<div className='form-row'>
        <button>Submit</button>
      </div>
      <div className='form-row'>
          <p>{errorMessage}</p>
      </div>
</form>
</div>
    )
}
export default Login