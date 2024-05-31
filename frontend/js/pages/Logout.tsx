import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "../../sass/pages/logout.scss";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Limpar o token de autenticação
    localStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirecionar após 3 segundos
    const timer = setTimeout(() => {
      navigate("/home");
    }, 5000);

    // Limpar o timer quando o componente desmontar
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container className="full-width-logout">
      <Row className="justify-content-center align-items-center w-100">
        <Col className="text-center" md={6}>
          <h2 className="mb-4">Thank You for Using The Mini Blog</h2>
          <p>You have been logged out successfully.</p>
          <p>Redirecting to the home page...</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Logout;
