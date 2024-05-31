import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router";

import { ApiService, Post } from "../api";
import "../../sass/pages/login.scss";

const Profile = () => {
  const { userSlug } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!userSlug) {
      return;
    }
    const data = {
      slug: userSlug,
    };

    // Chamada para obter a lista de posts assim que o componente for montado
    ApiService.apiPostsList2(data).then((response) => {
      console.log("Posts API - Profile return:", response);
      setPosts(response.results);
      console.log(posts);
    });
  }, []); // Executa somente uma vez, após a montagem do componente

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Lógica para lidar com o login
  };

  const handleSignupSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Lógica para lidar com o cadastro
  };

  return (
    <Container className="full-width" fluid>
      <Row className="justify-content-center align-items-center w-100">
        <h2 className="text-center mb-4">The Mini Blog</h2>
        <Col className="login-form" md={4}>
          <Form onSubmit={handleLoginSubmit}>
            <h2 className="text-center mb-4">Login</h2>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control placeholder="Enter email" type="email" />
            </Form.Group>

            <Form.Group className="mt-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control placeholder="Password" type="password" />
            </Form.Group>

            <Button className="w-100 mt-4" type="submit" variant="primary">
              Login
            </Button>
          </Form>
        </Col>
        <Col className="text-center" md={1}>
          <div className="separator">
            <hr className="top-line" />
            <p className="or-text">OR</p>
            <hr className="bottom-line" />
          </div>
        </Col>
        <Col className="signup-form" md={4}>
          <Form onSubmit={handleSignupSubmit}>
            <h2 className="text-center mb-4">Sign Up</h2>
            {/* Adicione campos de formulário para cadastro aqui */}
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control placeholder="Enter name" type="text" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control placeholder="Enter email" type="email" />
            </Form.Group>

            <Form.Group className="mt-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control placeholder="Password" type="password" />
            </Form.Group>

            <Button className="w-100 mt-4" type="submit" variant="primary">
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
