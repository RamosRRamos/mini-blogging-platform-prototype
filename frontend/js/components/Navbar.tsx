import {
  Navbar as Navbar1,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../sass/components/navbar.scss";
import isAuthenticated from "utils/isAuthenticated";

const Navbar = () => {

  const navbarIsAuthenticatedLogin = () => {
    if (isAuthenticated()) {
      return (
        <Button className="ms-2" variant="outline-primary">
          <Link className="link" to="/logout">
            Logout
          </Link>
        </Button>
      );

    }
    else {
      return (
        <Button className="ms-2" variant="outline-primary">
          <Link className="link" to="/">
            Sign In
          </Link>
        </Button>
      );
    }

  }


  const navbarIsAuthenticatedCreateAccount = () => {
    if (!isAuthenticated()) {
      return (
        <Button className="ms-2" variant="outline-primary">
          <Link className="link" to="/">
            Create a Account
          </Link>
        </Button>
      );

    }

  }



  return (
    <Navbar1 className="full-width-navbar" expand="lg">
      <Container>
        <Navbar1.Brand href="/home">Home</Navbar1.Brand>
        <Navbar1.Toggle aria-controls="basic-navbar-nav" />
        <Navbar1.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Posts</Nav.Link>
            <Nav.Link href="#link">Configs</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              aria-label="Search"
              className="me-2"
              placeholder="Search"
              type="search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>

          <div>
            {navbarIsAuthenticatedLogin()}
            {navbarIsAuthenticatedCreateAccount()}
          </div>
        </Navbar1.Collapse>
      </Container>
    </Navbar1>
  );
};

export default Navbar;
