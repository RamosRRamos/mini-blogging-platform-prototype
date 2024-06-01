import React, { useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import {Container, Row, Col, Button} from "react-bootstrap";
import "../../sass/pages/logout.scss";

const SignUp = () => {



  return (
    <Container className="full-width-logout">
      <Row className="justify-content-center align-items-center w-100">
        <Col className="text-center" md={6}>
          <h2 className="mb-4">Thank you for creating your Mini Blog account</h2>
          <p>Your password has been sent to your e-mail address, please check your e-mail address.</p>
          <Link to="/home"><Button> Click here to return to the login page</Button></Link>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
