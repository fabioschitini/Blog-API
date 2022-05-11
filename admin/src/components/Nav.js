import {Link} from 'react-router-dom'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';



const Nav = (props) => {
    const navigate=useNavigate()
console.log("uSerrrr",props.user)

    function logOut(){
        console.log("yeppepee")
        Axios.get("https://blooming-peak-71078.herokuapp.com"+"/logout")
        .then(function (response) {
          console.log('response.data.userrrrrrrrrrrrrrrrrrr')
          props.setUserData(response.data.user)
          navigate('/')
        })

    }
    //console.log(props.userData)
    return (
        <nav>     

        {props.user?
          <ul className='nav-list'>  
          <Link to="/"> <li className='nav-element'>Homepage</li></Link>
        
 <a onClick={logOut} className='nav-element'>Logout</a>
  <Link to="/post/create"><li className='nav-element'>Create Post</li></Link>
  </ul>
           
      
        
        :  <ul className='nav-list'> <Link to="/login"><li className='nav-element'>Login</li></Link></ul>
        
    }

              
           
        </nav>
    )
}
export default Nav