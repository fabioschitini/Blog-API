import { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Axios from 'axios'

const instance = Axios.create({
    baseURL: 'https://blooming-peak-71078.herokuapp.com'
  });

const PostCreate = (props) => {
    const navigate = useNavigate();

    const [title,setTitle]=useState('')
    const [content,setContent]=useState('')

    function onSubmit(e){
        e.preventDefault()
        console.log("Submiting")
        instance.post(`/post`,{title,content,status:true}).then(result=>{
            instance.get("/post").then(response=>{ console.log(response.data.post[0])
                props.setBackendDataPost(response.data.post)
                console.log("Created with sucess")
                navigate("/")
            })
        })
    } 


    return (
        <div>

<form className='speaker-form' onSubmit={onSubmit}>
<div className='form-row'>
        <label forhtml='nome'>Title</label>
        <input id='nome'  required value={title} type='text' onChange={(e) => setTitle(e.target.value)}/>
      </div>
      <div className='form-row'>
        <label forhtml='content'>Content</label>
        <textarea id='content'  required value={content} type='text' onChange={(e) => setContent(e.target.value)}/>
      </div>
<div className='form-row'>
        <button>Submit</button>
      </div>
</form>
   
</div>
    )
}
export default PostCreate