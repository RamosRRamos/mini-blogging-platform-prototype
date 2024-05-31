import React, {useState} from 'react';
import {Navbar, Nav, Form, FormControl, Button, Container, FormLabel} from 'react-bootstrap';
import {useNavigate} from "react-router";
import {ApiService} from "api";

const Navbar_Project = () => {



  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Posts</Nav.Link>
            <Nav.Link href="#link">Configs</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>

          <Button variant="outline-primary" className="ms-2">Sign In</Button>
          <Button variant="outline-primary" className="ms-2">Create a Account</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar_Project;
