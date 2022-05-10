import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'


  

const Home = (props) => {
//console.log(props.backendDataPost[0].title)
// if(props.user){
//     return <h1>Log In to use the site</h1>
// }
    return (
        <div>

{props.user?  
  <div >
      {props.backendDataPost?props.backendDataPost.map(post=>{
    return <div key={post._id}><Link to={{pathname:`/post/${post._id}`}}> <h1 className='nav-element'>{post.title}</h1></Link> </div>
 
 })
 :<h1>No Posts here....</h1>}

</div>
:<h1>Log in to use this website</h1>}
          
         <div className='post-container'>

         </div>
</div>
    )
}
export default Home