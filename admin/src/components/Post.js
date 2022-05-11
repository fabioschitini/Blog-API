import { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'
import {useParams } from 'react-router-dom'
import Axios from 'axios'

const instance = Axios.create({
    baseURL: 'https://blooming-peak-71078.herokuapp.com',
    withCredentials:true
  });

const Post = (props) => {
    const navigate = useNavigate();

    const { id } = useParams()  
    const [postDetails,setPostDetails]=useState([{}])
    const [comment,setComment]=useState([{}])
    const [addComment,setAddComment]=useState(false)
    const [name,setName]=useState('')
    const [content,setContent]=useState('')
    const [commentCounter,setCommentCounter]=useState(2)

    function moreComments(){
        setCommentCounter(commentCounter+1)
    }

    if(id){
        console.log("id existtttttttttttttttttttttttttttttttttttttt")
    }

    function deletePost(e){
        console.log("Deleting Post")
        instance.post("/post/delete",{postId:e.target.id,comment}).then(result=>{
            props.setBackendDataPost(result.data.post)
            console.log("deleted with sucess")
            navigate("/")
        })
    }

    function unpublishPost(){
        instance.post(`/post/update/${id}`,{title:postDetails.title,content:postDetails.content,status:false}).then(result=>{
            instance.get(`/post/${id}`).then(response=>{ console.log(response.data.post[0])
                setPostDetails(response.data.post)}
                )
                navigate("/")
            })
        }
    

    function publishPost(){
        instance.post(`/post/update/${id}`,{title:postDetails.title,content:postDetails.content,status:true}).then(result=>{
            instance.get(`/post/${id}`).then(response=>{ console.log(response.data.post[0])
                setPostDetails(response.data.post)
            
            })
                
                navigate("/")
            })
        }

        function deleteComment(e){
            console.log("deleting")
            instance.post("/comments/delete",{commentId:e.target.id}).then(result=>{
                console.log("deleted with sucess")
                instance.get(`/comments`).then(data=>{          
                    setComment(data.data.comments.filter(comment=>comment.post[0]===id))})
                    console.log("Sucess")

            })
        }
    



    function onSubmit(e){
        e.preventDefault()
        console.log("Submiting")
        instance.post("/comments",{name,content,postId:id}).then(result=>{
        setAddComment(false)
        instance.get(`/comments`).then(data=>{          
            setComment(data.data.comments.filter(comment=>comment.post[0]===id))})
        console.log("Sucess")
        })
    } 





useEffect(()=>{
    instance.get(`/post/${id}`).then(data=>{ 
        setPostDetails(data.data.post)})
        instance.get(`/comments`).then(data=>{          
            setComment(data.data.comments.filter(comment=>comment.post[0]===id))})
      },[])
    return (
        <div>
        {postDetails.content?
        <div> 
            <div> 

            <header className='post-header'>
            <h1>{postDetails.title}</h1>
                </header>
                <div className='post-content-div'> 
             <p className='post-content'>{postDetails.content} </p>
             <p>{postDetails.date}</p>
             </div>

             <div className='post-links'> 
             <button className='post-btn' id={postDetails._id} onClick={deletePost}>Delete</button>
            <Link className='post-btn' to={{
                pathname:`/post/update/${id}`
            }}>Edit</Link>
            {postDetails.published?<button className='post-btn' onClick={unpublishPost}>Unplublish</button>:<button className='post-btn' onClick={ publishPost}>Publish</button>}
             </div>
             </div>
             <p className='add-comment' onClick={()=>setAddComment(true)}>Add comment</p>
             <p className='add-comment' onClick={moreComments}>See more comments+</p>
            {addComment? <div>
                 <form className='speaker-form' onSubmit={onSubmit}>
<div className='form-row'>
        <label forhtml='name'>Name</label>
        <input id='name'  required value={name} type='text' onChange={(e) => setName(e.target.value)}/>
      </div>
      <div className='form-row'>
        <label forhtml='content'>Content</label>
        <input id='content'  required value={content} type='text' onChange={(e) => setContent(e.target.value)}/>
      </div>
<div className='form-row'>
        <button>Submit</button>
      </div>
</form>  
 </div>:null}
             <div> 
            
                    </div>
       {comment.slice(0,commentCounter).map(comment=>{
           return (<div key={comment._id}>
            <header className='comment-header'>
            <h4>{comment.name}</h4>
                </header>
                <div className='comment-content-div'> 
                <p className='post-content'>{comment.content}</p>         
                <p>{comment.date}</p>
             </div>
             <div className='post-links'> 
             <button className='post-btn' id={comment._id} onClick={ deleteComment}>Delete</button>

             </div>
               </div>)
       })}
        
         </div>:null}
</div>
    )
}
export default Post