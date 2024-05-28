import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-light text-dark mt-5">
      <Container>
        <Row className="py-4">
          <Col md={4}>
            <h5>Mini Blog</h5>
            <p>Este é um exemplo de um footbar em React usando Bootstrap.</p>
          </Col>
          <Col md={4}>
            <h5>Navigation</h5>
            <ul className="list-unstyled">
              <li><Link to="/home" className="text-dark">Home</Link></li>
              <li><Link to="/home" className="text-dark">Posts</Link></li>
              <li><Link to="/home" className="text-dark">Config</Link></li>
              <li><Link to="/about" className="text-dark">about</Link></li>
              <li><Link to="/home" className="text-dark">Logout</Link></li>
            </ul>
          </Col>
          <Col md={4}>

            <h5>Social media</h5>
            <ul className="list-unstyled d-flex">
              <li><a href="#facebook" className="text-dark me-3">Linkedin</a></li>
              <li><a href="#twitter" className="text-dark me-3">Github</a></li>

            </ul>
          </Col>
        </Row>
        <Row className="pt-3 border-top">
          <Col className="text-center">
            <p>&copy; 2024 Mini Blog. All rights reserved. <br/>
              Powered by <a href="https://github.com/RamosRRamos"> Wesley R. L</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
