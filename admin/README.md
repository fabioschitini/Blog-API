<Container>
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
</Container>