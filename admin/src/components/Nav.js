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

         <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
         <Container>
         <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         <Navbar.Collapse id="responsive-navbar-nav">
           <Nav className="me-auto">
           <Link to="/">  <Nav.Link href="#home">Home Page</Nav.Link></Link>
           {props.user?
           <Link to="/">  <Nav.Link onClick={logOut} href="#home">Log Out</Nav.Link></Link>
           :
           <Link to="/login">  <Nav.Link  href="#home">Login</Nav.Link></Link>
           }
             {props.user?
           <Link to="/post/create">  <Nav.Link href="#home">Create Post</Nav.Link></Link>
           :
           null
           }
            <NavDropdown style={{color:"rgba(0,0,0,.9)"}} title="Projects" id="nav-dropdown">
        <NavDropdown.Item href="/postList/all" to="/postList/all" eventKey="4.1">All Projects</NavDropdown.Item>
         <NavDropdown.Item href="/postList/Node.js" eventKey="4.2">Node</NavDropdown.Item>
          <NavDropdown.Item href="/postList/React" eventKey="4.3">React</NavDropdown.Item>
          <NavDropdown.Item href="/postList/MongoDB"  eventKey="4.4">MongoDb</NavDropdown.Item>
         <NavDropdown.Item href="/postList/Bootstrap"  eventKey="4.4">Bootstrap</NavDropdown.Item>
      </NavDropdown>
      <a class="nav-link"  href='https://www.scribd.com/document/553485298/My-Resume' download='CV.pdf' target="_blank" rel="noopener noreferrer" > CV↓  </a>
      <a class="nav-link"  target="_blank" rel="noopener noreferrer"  href='https://www.scribd.com/document/565717418/My-Resume-1' > Curriculo↓ </a>
      <Link to="/About-Me">  <Nav.Link href="#home">About Me</Nav.Link></Link>


           </Nav>
         
         </Navbar.Collapse>
         </Container>
       </Navbar>
      
        
        
   

              
           
     </div>
    )
}
export default Navs