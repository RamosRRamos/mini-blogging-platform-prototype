import React from "react";
import "../../sass/components/footer.scss";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-light text-light mt-5">
      <Container className="full-width-footer" fluid>
        <Row className="py-4">
          <Col md={4} className="text-center">
            <h5>Mini Blog</h5>
            <p>Start your blog</p>
          </Col>
          <Col md={4} className="text-center">
            <h5>Navigation</h5>
            <ul className="list-unstyled">
              <li>
                <Link className="text-light" to="/home">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-light" to="/home">
                  Posts
                </Link>
              </li>
              <li>
                <Link className="text-light" to="/home">
                  Config
                </Link>
              </li>
              <li>
                <Link className="text-light" to="/about">
                  about
                </Link>
              </li>
              <li>
                <Link className="text-light" to="/home">
                  Logout
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={4} className="text-center">
            <h5>Social media</h5>
            <ul className="list-unstyled  text-center">
              <li>
                <a className="text-light me-3" href="#facebook">
                  Linkedin
                </a>
              </li>
              <li>
                <a className="text-light me-3" href="#twitter">
                  Github
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <Container className="full-width-footer" fluid>
        <Row className="pt-3 border-top">
          <Col className="text-center">
            <p>
              &copy; 2024 Mini Blog. All rights reserved. <br />
              Powered by{" "}
              <a href="https://github.com/RamosRRamos"> Wesley R. L</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
