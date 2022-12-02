import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useAuthentication } from "../../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";

const { Brand } = { ...Navbar };
const NavbarComp = () => {
  const { dispatch } = useAuthentication();
  const navigate = useNavigate();

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Brand href="/leagues">Pokemon Leagues</Brand>
          <Nav className="me-auto">
            <NavLink id="RouterNavLink" className="navlink" to="/pokemons">
              Pokemons
            </NavLink>
            <NavLink id="RouterNavLink" className="navlink" to="/leagues">
              All Leagues
            </NavLink>
            <NavLink id="RouterNavLink" className="navlink" to="/add-pokemon">
              Add Pokemon
            </NavLink>
            <NavLink id="RouterNavLink" className="navlink" to="/add-league">
              Add Leagues
            </NavLink>
          </Nav>
          <Button
            className="logout-btn"
            onClick={() => {
              dispatch({
                type: "LOGOUT",
                payload: null,
              });
              navigate("/");
            }}
          >
            Logout
          </Button>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComp;
