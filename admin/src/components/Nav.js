import {Link} from 'react-router-dom'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Navbar,Nav,Container,NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const instance = Axios.create({
    baseURL: 'https://blooming-peak-71078.herokuapp.com',
    withCredentials:true
  
  });

const Navs = (props) => {
    const navigate=useNavigate()
console.log("uSerrrr",props.user)

    function logOut(){
        console.log("yeppepee")
        instance.get("/logout")
        .then(function (response) {
          console.log('response.data.userrrrrrrrrrrrrrrrrrr')
          props.setUserData(response.data.user)
          navigate('/')
        })

    }
    //console.log(props.userData)
    return (
       <div> 

        {props.user?
         <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
         <Container>
         <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         <Navbar.Collapse id="responsive-navbar-nav">
           <Nav className="me-auto">
           <Link to="/">  <Nav.Link href="#home">Home Page</Nav.Link></Link>
           <Link to="/post/create">  <Nav.Link href="#home">Create Post</Nav.Link></Link>
           <Link to="/">  <Nav.Link onClick={logOut} href="#home">Log Out</Nav.Link></Link>

           </Nav>
         
         </Navbar.Collapse>
         </Container>
       </Navbar>
      
        
        :  <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Link to="/login">  <Nav.Link href="#home">Login</Nav.Link></Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
        
    }

              
           
     </div>
    )
}
export default Navs