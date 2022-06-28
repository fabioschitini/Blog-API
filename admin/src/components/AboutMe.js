import {useParams } from 'react-router-dom'
import { Container,Col,Row} from 'react-bootstrap';



const AboutMe = (props) => {


    const { id } = useParams()  


      return (
     <Container>
        <Row g='5'>
        <Col md='4'>
          <img style={{width:'75%',borderRadius: "50%"}} id='profile' alt='profile' src='https://firebasestorage.googleapis.com/v0/b/learning-firebase-b9b2a.appspot.com/o/sasd.jpg?alt=media&token=61a21b0d-82a4-4771-80bf-0afe8ff2191a' />
         <h3>Favorite Tecnologies </h3>
         <div id='tecnologies'>
<a  href='https://www.javascript.com/' target="_blank" rel="noopener noreferrer"> <img style={{width:'20%'}}alt='tech' className='logo-tech' src='https://i0.wp.com/www.casamidia.com.br/wp-content/uploads/2016/03/js-logo.png?ssl=1'/> </a>
<a  href='https://developer.mozilla.org/pt-BR/docs/Web/CSS' target="_blank" rel="noopener noreferrer"> <img style={{width:'20%'}}alt='tech' className='logo-tech' src='https://llumine.com.br/wp-content/uploads/2018/03/css-logo-300x300.png'/> </a>
<a  href='https://reactnative.dev/' target="_blank" rel="noopener noreferrer"> <img style={{width:'20%'}}alt='tech' className='logo-tech' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png'/> </a>
<a  href='https://nodejs.org/en/' target="_blank" rel="noopener noreferrer"> <img style={{width:'20%'}}alt='tech' className='logo-tech' src='https://cdn.pixabay.com/photo/2015/04/23/17/41/node-js-736399_960_720.png'/> </a>
<a  href='https://www.mongodb.com/atlas/database' target="_blank" rel="noopener noreferrer"> <img style={{width:'20%'}}alt='tech' className='logo-tech' src='https://infinapps.com/wp-content/uploads/2018/10/mongodb-logo-256x300.png.webp'/> </a>
<a  href='https://github.com/fabioschitini' target="_blank" rel="noopener noreferrer"> <img style={{width:'20%'}}alt='tech' className='logo-tech' src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'/> </a>

         </div>
           </Col>

           <Col md='8'>
           <h2 >About me</h2>
       <p>
  I am a JavaScript developer, using React to create
         frontEnd functionality and Node.Js,Express,MongoDb to create an API on the backend.
        I have done  several projects on <a href='https://www.theodinproject.com' target="_blank" rel="noopener noreferrer">The odin project</a>,
        where I learned most of my current skils. I have created a fair bit of projects using the tecnologies mentioned above,as
        you can see some of it are on this website, but most are on <a href='https://github.com/fabioschitini' target="_blank" rel="noopener noreferrer">my github account</a>.
        I am always learning, and I am looking  towards my career as a Web Developer
           
             </p>
       <h2>Tecnologies </h2>
       <ul id='tech-list'>
          <li>JS</li>
          <li>HTML</li>
          <li>CSS</li> 
          <li>React</li>
          <li>Node</li>
          <li>MongoDb</li>

       </ul>

       <div id='social-media'>
            <h1 className='contact-info'>Social Media </h1>
            <ul >
                 <li className='social-media-list'>
                 <a className='link' href='https://www.linkedin.com/in/fabio-schitini-alves-de-oliveira-4022b4194/?trk=public-profile-join-page' 
                 target="_blank" rel="noopener noreferrer">
                <img style={{width:'10%'}} id='linkedin' alt='linkedin' src='https://expertdigital.net/wp-content/uploads/2018/11/linkedin-logo.png'/> 
            </a>
            </li>
            <li className='social-media-list'>
                 <a className='link' href='https://github.com/fabioschitini' 
                 target="_blank" rel="noopener noreferrer">
                <img style={{width:'10%'}}  id='linkedin' alt='linkedin' src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'/> 
            </a>
            </li>
            </ul>
             </div>
             
            </Col> 
       
        </Row>
     </Container>
     
    )
}
export default AboutMe