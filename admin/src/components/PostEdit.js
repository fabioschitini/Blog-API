import { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import {useParams } from 'react-router-dom'
import Axios from 'axios'

const instance = Axios.create({
    baseURL: 'https://blooming-peak-71078.herokuapp.com'
  });

const PostEdit = (props) => {
    const navigate = useNavigate();

    const { id } = useParams()  
    const [title,setTitle]=useState('')
    const [content,setContent]=useState('')

    function onSubmit(e){
        e.preventDefault()
        console.log("Submiting")
        instance.post(`/post/update/${id}`,{title,content}).then(result=>{
            instance.get("/post").then(response=>{ console.log(response.data.post[0])
                props.setBackendDataPost(response.data.post)
                navigate("/")
            })
        })
    } 

useEffect(()=>{
if(props.backendDataPost[0].title){
    setTitle(props.backendDataPost.filter(data=>data._id===id)[0].title)
    setContent(props.backendDataPost.filter(data=>data._id===id)[0].content)
}},[props.backendDataPost])
    return (
        <div>
{props.backendDataPost[0].title!==undefined?

<form className='speaker-form' onSubmit={onSubmit}>
<div className='form-row'>
        <label forHtml='nome'>Title</label>
        <input id='nome'  required value={title} type='text' onChange={(e) => setTitle(e.target.value)}/>
      </div>
      <div className='form-row'>
        <label forHtml='content'>Content</label>
        <input id='content'  required value={content} type='text' onChange={(e) => setContent(e.target.value)}/>
      </div>
<div className='form-row'>
        <button>Submit</button>
      </div>
</form>
    
    
    :null}
</div>
    )
}
export default PostEdit