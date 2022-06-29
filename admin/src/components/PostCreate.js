import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import { Form,Button,Container,Col,Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik } from 'formik';
import * as yup from 'yup';


const instance = Axios.create({
    baseURL: 'https://blooming-peak-71078.herokuapp.com',
    withCredentials:true
  });

const PostCreate = (props) => {
    const navigate = useNavigate();




    const schema = yup.object().shape({
      title: yup.string().required("Esse campo é obrigatorio"),
      summary: yup.string().required("Esse campo é obrigatorio"),
      feature: yup.string().required("Esse campo é obrigatorio"),
      outcome:yup.string().required('Esse campo é obrigatorio'),
      learned: yup.string().required("Esse campo é obrigatorio"),
  
    });


    return (
        <div>
<Container>
<Formik
      validationSchema={schema}
      onSubmit={values=>{
        console.log("Submiting")
        console.log(values.feature,"featureeeeeeeeeeeeeeeeeeeeeeeee")
        console.log(values.tech,"featureeeeeeeeeeeeeeeeeeeeeeeee")
        instance.post(`/post`,{title:values.title,summary:values.summary,feature:values.feature,tech:values.tech,
         status:true,outcome:values.outcome,learned:values.learned}).then(result=>{
            instance.get("/post").then(response=>{ console.log(response.data.post[0])
                props.setBackendDataPost(response.data.post)
                console.log("Created with sucess")
                navigate("/")
            })
        })


      }}
      initialValues={{
        title: '',
        summary: '',
        feature: '',
        outcome: '',
        learned: "",
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
        value={"JavaScript"}
        onChange={handleChange}
        name={"tech"}
        />
        <Form.Check 
        type={'checkbox'}
        label={`Node`}
        value={"Node.js"}
        onChange={handleChange}
        name={"tech"}
        /><Form.Check 
        type={'checkbox'}
        label={`React`}
        value={"React"}
        onChange={handleChange}
        name={"tech"}
        />
 
</Col>
<Col>
       <Form.Check 
        type={'checkbox'}
        label={`MongoDB`}
        value={"MongoDB"}
        onChange={handleChange}
        name={"tech"}
        />
         <Form.Check 
        type={'checkbox'}
        label={`Bootstrap`}
        value={"Bootstrap"}
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
</div>
    )
}
export default PostCreate