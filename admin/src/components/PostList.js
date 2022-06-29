import {useParams } from 'react-router-dom'
import {Link} from 'react-router-dom'
import { Spinner} from 'react-bootstrap';



const PostList = (props) => {


    const { id } = useParams()  
    console.log(id,"iddddddddddddddddddddddddddddddddddddd")

      return (
        <div class="container">
        <div class="row mb-2">
        {props.backendDataPost[0].tech? 
            props.backendDataPost.map((data)=>{
                if(id==='all'){
                  return(
                  <div class="col-md-6">
                     <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                         <div class="col p-4 d-flex flex-column position-static">
                             <strong class="d-inline-block mb-2 text-primary">World</strong>
                                <h3 class="mb-0">{data.title}</h3>
                            <div class="mb-1 text-muted">{data.date}</div>
                             <p class="card-text mb-auto">{data.summary}</p>
                                <Link to={{pathname:`/post/${data._id}`}}> <a href="" class="stretched-link">Continue reading</a></Link>
                            </div>
                    
          </div>
        </div> )
                }
           

                    else if(data.tech.includes(id)){
                        return(
                            <div class="col-md-6">
                    <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                      <div class="col p-4 d-flex flex-column position-static">
                        <strong class="d-inline-block mb-2 text-primary">World</strong>
                        <h3 class="mb-0">{data.title}</h3>
                        <div class="mb-1 text-muted">{data.date}</div>
                        <p class="card-text mb-auto">{data.summary}</p>
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
    )
}
export default PostList