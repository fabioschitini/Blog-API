import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner} from 'react-bootstrap';


  

const Home = (props) => {
//console.log(props.backendDataPost[0].title)
// if(props.user){
//     return <h1>Log In to use the site</h1>
// }
return (
    <div>
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
            <div>
          
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
      <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

    </div>
  </div>
</div>

</div>  )
        }
        
       
      })
     
      : <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>}

       </div>
</div>
</div>


)
}
export default Home