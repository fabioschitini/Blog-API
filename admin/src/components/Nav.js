import {Link} from 'react-router-dom'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Navbar,Nav,Container,NavDropdown,Col,Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const instance = Axios.create({
    baseURL: 'https://blooming-peak-71078.herokuapp.com/',
    withCredentials:true
  
  });

const Navs = (props) => {
    const navigate=useNavigate()
//console.log("uSerrrr",props.user)

    function logOut(){
        console.log("yeppepee")
        instance.get("/logout")
        .then(function (response) {
          console.log('response.data.userrrrrrrrrrrrrrrrrrr')
          props.setUserData(response.data.user)
          navigate('/Blog-API')
        })

    }
    //console.log(props.userData)
    return (
       <div> 

         <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
         <Container>
         <Navbar.Brand href="#home">Portfolio Blog</Navbar.Brand>
         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         <Navbar.Collapse id="responsive-navbar-nav">
           <Nav classNameName="me-auto">
           <Link to="/Blog-API/">  <Nav.Link href="#home">Home Page</Nav.Link></Link>
           {props.user?
           <Link to="/Blog-API">  <Nav.Link onClick={logOut} href="#home">Log Out</Nav.Link></Link>
           :
           <Link to="/Blog-API/login">  <Nav.Link  href="#home">Login</Nav.Link></Link>
           }
             {props.user?
           <Link to="/Blog-API/post/create">  <Nav.Link href="#home">Create Post</Nav.Link></Link>
           :
           null
           }
   

   

           <Link style={{textDecoration: 'none',color: '#212529',}} to="/Blog-API/list/all" ><Nav.Link href="#home">All</Nav.Link></Link>
          <Link style={{textDecoration: 'none',color: '#212529',}} to="/Blog-API/list/Node.js" ><Nav.Link href="#home">Node</Nav.Link></Link>
         <Link style={{textDecoration: 'none',color: '#212529',}} to="/Blog-API/list/React" ><Nav.Link href="#home">React</Nav.Link></Link>
         <Link style={{textDecoration: 'none',color: '#212529',}} to="/Blog-API/list/MongoDB" ><Nav.Link href="#home">MongoDb</Nav.Link></Link>  
        <Link style={{textDecoration: 'none',color: '#212529',}} to="/Blog-API/list/Bootstrap" ><Nav.Link href="#home">Bootstrap</Nav.Link></Link>
       
      <a className="nav-link"  href='https://www.scribd.com/document/553485298/My-Resume' download='CV.pdf' target="_blank" rel="noopener noreferrer" > CV↓  </a>
      <a className="nav-link"  target="_blank" rel="noopener noreferrer"  href='https://www.scribd.com/document/565717418/My-Resume-1' > Curriculo↓ </a>
      <Link to="Blog-API/About-Me">  <Nav.Link href="#home">About Me</Nav.Link></Link>


           </Nav>
         
         </Navbar.Collapse>
         </Container>
       </Navbar>
      
        
        
   

              
           
     </div>
    )
}
export default Navs