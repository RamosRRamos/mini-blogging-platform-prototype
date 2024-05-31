import React, {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {ApiService} from "../api";
import "../../sass/pages/login.scss";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const generateSlug = (email: string) => {
    // Extrai o primeiro nome do email
    const firstName = email.split('@')[0].split('.')[0];

    // Gera uma sequência de números aleatórios
    const randomNumber = Math.floor(Math.random() * 1000000);

    // Concatena o primeiro nome com a sequência de números aleatórios
    return `${firstName}${randomNumber}`;
  };


  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Login start");
    let data = {formData: {username, password, token: "string"}};
    try {
      const response = await ApiService.apiObtainAuthTokenCreate(data);
      console.log("Login token", response);
      if (response.token) {
        document.cookie = `token=${response.token}`;
        localStorage.setItem("token", response.token);
        console.log("Login success");
        navigate("/home");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };
  const generatedSlug = generateSlug(email);
  const handleSignupSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Signup start");
    let data = {
      requestBody: {
        id: 0,
        name: name,
        slug: generatedSlug,
        email,
        modified: "string",
        created: "string",
      },
    };
    try {
      const response = await ApiService.apiUsersCreate(data);
      console.log("Signup response", response);

      console.log("Signup success, email sent");
      navigate("/home");
    } catch (error) {
      console.error("Erro ao fazer cadastro:", error);
    }
  };

  return (
    <Container className="full-width" fluid>
      <Row className="justify-content-center align-items-center w-100">
        <h2 className="text-center mb-4">The Mini Blog</h2>
        <Col className="login-form" md={4}>
          <Form onSubmit={handleLoginSubmit}>
            <h2 className="text-center mb-4">Login</h2>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>User (Email address)</Form.Label>
              <Form.Control
                placeholder="Enter email"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button className="w-100 mt-4" type="submit" variant="primary">
              Login
            </Button>
          </Form>
        </Col>
        <Col className="text-center" md={1}>
          <div className="separator">
            <hr className="top-line"/>
            <p className="or-text">OR</p>
            <hr className="bottom-line"/>
          </div>
        </Col>
        <Col className="signup-form" md={4}>
          <Form onSubmit={handleSignupSubmit}>
            <h2 className="text-center mb-4">Sign Up</h2>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Enter name"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                placeholder="Enter email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
