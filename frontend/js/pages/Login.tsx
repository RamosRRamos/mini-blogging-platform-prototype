import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ApiService, User } from "../api";
import "../../sass/pages/login.scss";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");  // Estado para mensagem de erro no login
  const [signupError, setSignupError] = useState(""); // Estado para mensagem de erro no signup
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();

  const getFirstName = (email: string) => {
    const firstName = email.split('@')[0].split('.')[0];
    return `${firstName}`;
  };

  const generateSlug = (email: string) => {
    const firstName = getFirstName(email);
    const randomNumber = Math.floor(Math.random() * 1000000);
    return `${firstName}${randomNumber}`;
  };

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Login start");
    let data = { formData: { username, password, token: "string" } };
    try {
      const response = await ApiService.apiObtainAuthTokenCreate(data);
      console.log("Login token", response);
      if (response.token) {
        document.cookie = `token=${response.token}`;
        localStorage.setItem("token", response.token);
        const userData = await ApiService.apiUserByTokenRetrieve({ id: 0, token: "1" });
        setUser(userData);
        if (typeof userData.results[0].name === "string") {
          localStorage.setItem("user_name", userData.results[0].name);
        } else {
          localStorage.setItem("user_name", getFirstName(userData.results[0].email));
        }
        localStorage.setItem("user_email", userData.results[0].email);
        localStorage.setItem("user_slug", userData.results[0].slug);
        console.log("User data", userData);
        console.log("Login success");
        navigate("/home");
      } else {
        setLoginError("Credentials not found, please check again");  // Atualize a mensagem de erro
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setLoginError("Credentials not found, please check again");  // Atualize a mensagem de erro
    }
  };

  const handleSignupSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Signup start");
    const generatedSlug = generateSlug(email); // Gerar o slug aqui
    let data = {
      requestBody: {
        id: 0,
        name,
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
      setSignupError("Error during signup, please check your information and try again.");  // Atualize a mensagem de erro
    }
  };

  return (
    <Container className="full-width" fluid>
      <Row className="justify-content-center align-items-center w-100">
        <h2 className="text-center mb-4">The Mini Blog</h2>
        <Col className="login-form" md={4}>
          <Form onSubmit={handleLoginSubmit}>
            <h2 className="text-center mb-4">Login</h2>
            {loginError && <p className="text-danger text-center">{loginError}</p>}  {/* Exibe a mensagem de erro */}
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
            <hr className="top-line" />
            <p className="or-text">OR</p>
            <hr className="bottom-line" />
          </div>
        </Col>
        <Col className="signup-form" md={4}>
          <Form onSubmit={handleSignupSubmit}>
            <h2 className="text-center mb-4">Sign Up</h2>
            {signupError && <p className="text-danger text-center">{signupError}</p>}  {/* Exibe a mensagem de erro */}
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Enter name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
