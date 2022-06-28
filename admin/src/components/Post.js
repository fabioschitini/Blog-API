import { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'
import {useParams } from 'react-router-dom'
import Axios from 'axios'
import { Form,Button,Accordion} from 'react-bootstrap';

const instance = Axios.create({
    baseURL: 'https://blooming-peak-71078.herokuapp.com',
    withCredentials:true
  });

const Post = (props) => {
    const navigate = useNavigate();

    const { id } = useParams()  

    const [postDetails,setPostDetails]=useState([{}])
    const [comment,setComment]=useState([{}])
   
    const [name,setName]=useState('')
    const [content,setContent]=useState('')
    const [commentCounter,setCommentCounter]=useState(2)

    function moreComments(){
        setCommentCounter(commentCounter+1)
    }


    function deletePost(e){
        if(!props.user){
            return
        }
        console.log("Deleting Post")
        instance.post("/post/delete",{postId:e.target.id,comment}).then(result=>{
            props.setBackendDataPost(result.data.post)
            console.log("deleted with sucess")
            navigate("/")
        })
    }

  //  function unpublishPost(){
    //    instance.post(`/post/update/${id}`,{title:postDetails.title,content:postDetails.content,status:false}).then(result=>{
      //      instance.get(`/post/${id}`).then(response=>{ console.log(response.data.post[0])
          //      setPostDetails(response.data.post)}
          //      )
           //     navigate("/")
          //  })
       // }
    

  //  function publishPost(){
    //    instance.post(`/post/update/${id}`,{title:postDetails.title,content:postDetails.content,status:true}).then(result=>{
      //      instance.get(`/post/${id}`).then(response=>{ console.log(response.data.post[0])
        //        setPostDetails(response.data.post)
            
         //   })
                
         //       navigate("/")
        //    })
       // }

        function deleteComment(e){
            if(!props.user){
                return
            }
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
       
        instance.get(`/comments`).then(data=>{          
            setComment(data.data.comments.filter(comment=>comment.post[0]===id))})
        console.log("Sucess")
        })
    } 



console.log(postDetails.tech)

useEffect(()=>{
    instance.get(`/post/${id}`).then(data=>{ 
        setPostDetails(data.data.post)})
        instance.get(`/comments`).then(data=>{          
            setComment(data.data.comments.filter(comment=>comment.post[0]===id))})
      },[])
      return (
        <div>
            <div class="row g-5" style={{margin:"0"}}>
            <article class="blog-post">
        <h2 class="blog-post-title mb-1">{postDetails.title}</h2>
        <p class="blog-post-meta">{postDetails.date} by <a href="#">Fabio</a></p>

        <p>{postDetails.summary}</p>
        <hr/>

        
        <h2>Feature</h2>       
        <p>{postDetails.feature}</p>
        <hr/>
        <h3>Built With</h3>
        <p>This is some additional paragraph placeholder content. It's a slightly shorter version of the other highly repetitive body text used throughout. This is an example unordered list:</p>
        <ul>
        {postDetails.tech?
        
        postDetails.tech.map(tech=>{
        return (
          <li>{tech}</li>
        )
       }):null}
        </ul>
        <hr/>
  
        <h2>Outcome</h2>
        <p>{postDetails.outcome}</p>
        <hr/>
        <h3>What I learned</h3>
        <p> {postDetails.learned}</p>
        <hr/>
{props.user?<Button style={{marginRight:"20px"}}  onClick={deletePost}>Delete</Button>   :null}
{props.user?   <Link className="btn btn-primary" to={{
                pathname:`/post/update/${id}`
            }}>Edit</Link>  :null}
      </article>

        <div> 
 
             <p className='add-comment' onClick={moreComments}>See more comments+</p>
          
              <Accordion defaultActiveKey="0">
  <Accordion.Item eventKey="0">
    <Accordion.Header>Add Comment</Accordion.Header>
    <Accordion.Body>

    <Form onSubmit={onSubmit}>

<Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>Name</Form.Label>
  <Form.Control style={{maxWidth:"400px"}} value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter your name" />
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>Content</Form.Label>
  <Form.Control rows={3} style={{maxWidth:"600px"}}  as="textarea" value={content} onChange={(e) => setContent(e.target.value)} type="text" placeholder="Content..." />
</Form.Group>

<Button variant="primary" type="submit">
  Submit
</Button>
</Form>
    </Accordion.Body>
  </Accordion.Item>
</Accordion>

<hr/>
       {comment.slice(0,commentCounter).map((comment,element,array)=>{
           return (<div key={comment._id}>
           <div class="col-md-6">
      <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
          <strong class="d-inline-block mb-2 text-primary">{comment.name}</strong>
          <h3 class="mb-0">{comment.title}</h3>
          <div class="mb-1 text-muted">{comment.date}</div>
          <p class="card-text mb-auto">{comment.content}</p>
          {props.user?<Button id={comment._id} style={{marginRight:"20px",width:"20%"}}  onClick={deleteComment}>Delete</Button>   :null}
        </div>
        <div class="col-auto d-none d-lg-block">

        </div>
      </div>
    </div>
               </div>)
       })}
        
         </div>
        
</div>

</div>
    )
}
export default Post