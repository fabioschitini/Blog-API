import { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Button,Col,Form} from 'react-bootstrap';
import { Formik } from 'formik';

//const instance = Axios.create({
  //  withCredentials: true,
   // baseURL: "http://localhost:3001",
    
  //})

  const instance = Axios.create({
    baseURL: 'http://localhost:3001/',
    withCredentials:true
  });

const Login = (props) => {
    const navigate = useNavigate();

    const [errorUserMessage,setErrorUserMessage]=useState(false)
    const [errorPasswordMessage,setErrorPasswordMessage]=useState(false)

   
    return (
      <div class="container col-xl-10 col-xxl-8 px-4 py-5"> 
        <div class="row align-items-center g-lg-5 py-5">
        <div class="col-lg-7 text-center text-lg-start">
        <h1 class="display-4 fw-bold lh-1 mb-3">Admin log in </h1>
        <p class="col-lg-10 fs-4">Only the admin can accese this part of the website, where he can delete,create,publish post and comments</p>
      </div>
      <div class="col-md-10 mx-auto col-lg-5"> 
    <Formik
      onSubmit={values=>{
        console.log("Submiting")
        instance.post("/login",{username:values.username,password:values.password}).then(result=>{
            if(result.data.errors){
              if(result.data.errors==="Username not found")
                setErrorUserMessage(result.data.errors)
                else {
                  setErrorPasswordMessage(result.data.errors)
                  setErrorUserMessage(false)
                }
            }

            else {
              console.log("login result",result.data.user)
              setErrorUserMessage(false)
              setErrorPasswordMessage(false)

              props.setUserData(result.data.user)
              navigate("/")
            }
        })
      }}
      initialValues={{
        username: '',
        password:'',
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
        isValidating,
        validate,
      }) => (
        <Form class="p-4 p-md-7 border rounded-3 bg-light" noValidate onSubmit={handleSubmit}>
     
          
            <Form.Group as={Col} md="10" controlId="validationFormik01">
              <Form.Label>User</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                isInvalid={!!errorUserMessage}
                placeholder="Username"
              />
  <Form.Control.Feedback type="invalid">{errorUserMessage}</Form.Control.Feedback>         
                 </Form.Group>

                 <Form.Group as={Col} md="10" controlId="validationFormik01">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={!!errorPasswordMessage}
                placeholder="Password"
              />
  <Form.Control.Feedback type="invalid">{errorPasswordMessage}</Form.Control.Feedback>         
                 </Form.Group>
            
          <Button class="w-100 btn btn-lg btn-primary" style={{marginTop:"10vh"}} type="submit">Log In</Button>
        </Form>
      )}
    </Formik>
    </div>
   
    </div>
</div>
    )
}
export default Login