import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner} from 'react-bootstrap';
import Axios from 'axios'
import { useState,useEffect } from 'react'

const instance = Axios.create({
  baseURL: 'https://blooming-peak-71078.herokuapp.com',
  withCredentials:true
});
  

const Home = (props) => {
  const [postDetails,setPostDetails]=useState(false)
 
useEffect(()=>{
  instance.get(`/post`).then(data=>{ 
    setPostDetails(data.data.post.filter((post,index,array)=>index===array.length-1)[0])
    }
      )
    },[])
  

return (
    <div>
<main class="container">
<div class="p-4 p-md-5 mb-4 text-white rounded bg-dark">
<div class="col-md-6 px-0">
  <h1 class="display-4 fst-italic">Title of a longer featured blog post</h1>
  <p class="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.</p>
  <p class="lead mb-0"><a href="#" class="text-white fw-bold">Continue reading...</a></p>
</div>
</div>



         
<div class="container">
<div class="row mb-2">
{props.backendDataPost[0]? 
    props.backendDataPost.map((data,index,array)=>{
        if(index<3){
          return(
          
          
          <div class="col-md-6">
  <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
    <div class="col p-4 d-flex flex-column position-static">
      <strong class="d-inline-block mb-2 text-primary">World</strong>
      <h3 class="mb-0">{data.title}</h3>
      <div class="mb-1 text-muted">{data.date}</div>
      <p class="card-text mb-auto">{data.content}</p>
      <Link to={{pathname:`/post/${data._id}`}}> <a href="" class="stretched-link">Continue reading</a></Link>
    </div>
    <div class="col-auto d-none d-lg-block">

    </div>
  </div>
</div> )
        }
        
       
      })
     
      : <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>}



       </div>
</div>
  <div class="row g-5"> 
  <div class="col-md-8">
  <h3 class="pb-4 mb-4 fst-italic border-bottom">
        From the Firehose
      </h3>
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
      </article>
    
     
  
    
     </div>

  <div class="col-md-4">
      <div class="position-sticky" style={{top: "2rem"}} >
        <div class="p-4 mb-3 bg-light rounded">
          <h4 class="fst-italic">About</h4>
          <p class="mb-0">My most recent publication on this blog, it features...</p>
        </div>

        <div class="p-4">
          <h4 class="fst-italic">Archives</h4>
          <ol class="list-unstyled mb-0">
            <li><a href="#">March 2021</a></li>
            <li><a href="#">February 2021</a></li>
            <li><a href="#">January 2021</a></li>
            <li><a href="#">December 2020</a></li>
            <li><a href="#">November 2020</a></li>
            <li><a href="#">October 2020</a></li>
            <li><a href="#">September 2020</a></li>
            <li><a href="#">August 2020</a></li>
            <li><a href="#">July 2020</a></li>
            <li><a href="#">June 2020</a></li>
            <li><a href="#">May 2020</a></li>
            <li><a href="#">April 2020</a></li>
          </ol>
        </div>

        <div class="p-4">
          <h4 class="fst-italic">Elsewhere</h4>
          <ol class="list-unstyled">
            <li><a href="#">GitHub</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Facebook</a></li>
          </ol>
        </div>
      </div>
    </div>
  </div>

  </main>
</div>)
}
export default Home