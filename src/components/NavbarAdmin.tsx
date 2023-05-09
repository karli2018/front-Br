import React, { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const NavbarAdmin = () => {
  const { authState, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          Gestión
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link to={"/Alumnos"} as={Link}>
              Listar estudiantes
            </Nav.Link>
            <Nav.Link to={"/Cursos"} as={Link}>
              Cursos
            </Nav.Link>

            <Nav.Link to={"/RegisterAccount"} as={Link}>
              Registrar usuario
            </Nav.Link>
          </Nav>
          <Nav className="justify-contend-end">
            <Nav.Item>
              {authState.isLogged ? (
                <Button variant="danger" size="lg" onClick={() => logOut()}>
                  Logout
                </Button>
              ) : (
                <Button size="lg" onClick={() => navigate("/Login")}>
                  Login
                </Button>
              )}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
