import { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import {useParams } from 'react-router-dom'
import Axios from 'axios'
import { Form,Button,Container,Col,Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik } from 'formik';
import * as yup from 'yup';

const instance = Axios.create({
    baseURL: 'https://blooming-peak-71078.herokuapp.com',
    withCredentials:true
  });

const PostEdit = (props) => {
    const navigate = useNavigate();

    const { id } = useParams()  
    const [title,setTitle]=useState(false)
    const [summary,setSummary]=useState(false)
    const [outcome,setOutcome]=useState(false)
    const [feature,setFeature]=useState(false)
   // const [tech,setTech]=useState(false)
    const [learned,setLearned]=useState(false)

    const schema = yup.object().shape({
        title: yup.string().required("Esse campo é obrigatorio"),
        summary: yup.string().required("Esse campo é obrigatorio"),
        feature: yup.string().required("Esse campo é obrigatorio"),
        outcome:yup.string().required('Esse campo é obrigatorio'),
        learned: yup.string().required("Esse campo é obrigatorio"),
    
      });

   

useEffect(()=>{
if(props.backendDataPost[0].title){
    setTitle(props.backendDataPost.filter(data=>data._id===id)[0].title)
    setSummary(props.backendDataPost.filter(data=>data._id===id)[0].summary)
    setFeature(props.backendDataPost.filter(data=>data._id===id)[0].feature)
    setLearned(props.backendDataPost.filter(data=>data._id===id)[0].learned)
    setOutcome(props.backendDataPost.filter(data=>data._id===id)[0].outcome)

    console.log(title,"titleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
}},[props.backendDataPost])
return (
    <div>

        {title?
        <Container>
        <Formik
          validationSchema={schema}
          onSubmit={values=>{
            console.log("Submiting")
            instance.post(`/post/update/${id}`,{title:values.title,summary:values.summary,feature:values.feature,tech:values.tech,
              status:true,outcome:values.outcome,learned:values.learned,id}).then(result=>{
                instance.get("/post").then(response=>{ console.log(response.data.post[0])
                    props.setBackendDataPost(response.data.post)
                    console.log("Created with sucess")
                    navigate("/Blog-API")
                })
            })
        
        
          }}
          initialValues={{
            title: title,
            summary: summary,
            feature: feature,
            outcome: outcome,
            learned: learned,
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
            <Form noValidate onSubmit={handleSubmit}>
            <Row>
            <Col>
                <Form.Group   md="10" controlId="validationFormik01">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    isValid={touched.title && !errors.title}
                    placeholder="Your title"
                    rows={3}  as="textarea"
                  />
                  <Form.Control.Feedback>Tudo certo!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="10" controlId="validationFormik01">
                  <Form.Label>Summary</Form.Label>
                  <Form.Control
                    type="text"
                    name="summary"
                    value={values.summary}
                    onChange={handleChange}
                    isValid={touched.summary && !errors.summary}
                    rows={3}  as="textarea"
                  />
        <Form.Control.Feedback>Everything all right!</Form.Control.Feedback>            
          </Form.Group>
        
                     <Form.Group as={Col} md="10" controlId="validationFormik01">
                  <Form.Label>Feature</Form.Label>
                  <Form.Control
                    type="text"
                    name="feature"
                    value={values.feature}
                    onChange={handleChange}
                    isValid={touched.feature && !errors.feature}
                    placeholder="Features..."
                    rows={3}  as="textarea"
                  />
        <Form.Control.Feedback>Everything all right!</Form.Control.Feedback>                  
                     </Form.Group>
        
                     <Row>
        <Col>
          <Form.Check 
            type={'checkbox'}
            label={`JS`}
            value={"javascript"}
            onChange={handleChange}
            name={"tech"}
            />
            <Form.Check 
            type={'checkbox'}
            label={`Node`}
            value={"node"}
            onChange={handleChange}
            name={"tech"}
            /><Form.Check 
            type={'checkbox'}
            label={`React`}
            value={"react"}
            onChange={handleChange}
            name={"tech"}
            />
        
        </Col>
        <Col>
           <Form.Check 
            type={'checkbox'}
            label={`MongoDB`}
            value={"mongo"}
            onChange={handleChange}
            name={"tech"}
            />
             <Form.Check 
            type={'checkbox'}
            label={`Bootstrap`}
            value={"bootstrap"}
            onChange={handleChange}
            name={"tech"}
            />
            </Col>
        </Row>
            
                </Col>
                <Col>
                <Form.Group as={Col} md="10" controlId="validationFormik01">
                  <Form.Label>Outcome</Form.Label>
                  <Form.Control
                    type="text"
                    name="outcome"
                    value={values.outcome}
                    onChange={handleChange}
                    isValid={touched.outcome && !errors.outcome}
                    placeholder="Outcome..."
                    rows={3}  as="textarea"
                  />
        <Form.Control.Feedback>Everything all right!</Form.Control.Feedback>                  
                     </Form.Group>
          
                     <Form.Group as={Col} md="10" controlId="validationFormik01">
                  <Form.Label>Learned</Form.Label>
                  <Form.Control
                    type="text"
                    name="learned"
                    value={values.learned}
                    onChange={handleChange}
                    isValid={touched.learned && !errors.learned}
                    placeholder="Learned..."
                    rows={3}  as="textarea"
                  />
        <Form.Control.Feedback>Everything all right!</Form.Control.Feedback>                  
                     </Form.Group>
        
                </Col> 
                </Row>
                
              <Button style={{marginTop:"10vh"}} type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
        </Container>
        
        
        :null}

</div>
)
}
export default PostEdit