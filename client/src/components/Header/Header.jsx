import { Link, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import CartIcon from '../CartIcon/CartIcon';
import logo from '../../assets/logo.svg';
import searchIcon from '../../assets/search.svg';
import userIcon from '../../assets/user.svg';

export default function Header() {
  return (
    <>
      <a href="#main" className="skip-link">Перейти к основному содержимому</a>
      <Navbar as="header" bg="white" className="border-bottom py-2" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/catalog" aria-label="пиксельмаркет — на главную">
            <img src={logo} alt="" width="168" height="32" />
          </Navbar.Brand>
          <Nav as="nav" aria-label="Основная навигация" className="ms-auto flex-row align-items-center gap-2 gap-sm-3">
            <Nav.Link as={NavLink} to="/catalog" aria-label="Каталог" className="d-flex flex-column align-items-center small text-body">
              <img src={searchIcon} alt="" width="24" height="24" />
              <span className="d-none d-sm-inline" aria-hidden="true">Каталог</span>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/profile" aria-label="Профиль" className="d-flex flex-column align-items-center small text-body">
              <img src={userIcon} alt="" width="24" height="24" />
              <span className="d-none d-sm-inline" aria-hidden="true">Профиль</span>
            </Nav.Link>
            <CartIcon />
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
