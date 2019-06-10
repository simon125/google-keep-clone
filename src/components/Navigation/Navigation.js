import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  height: 80px;
  background-color: #f4b400;
  display: flex;
  justify-content: space-between;
  color: #fff;
  padding: 0 30px;
  align-items: center;
`;
const LinksGroup = styled.ul`
  margin-right: 100px;
  display: flex;
  list-style: none;
`;
const NavElement = styled.li`
  margin: 0 15px;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.1);
  }
`;
const AuthButton = styled.a`
  text-decoration: none;
  color: #fff;
`;

function Navigation() {
  return (
    <Nav>
      <h1>Google Keep Clone</h1>
      <LinksGroup>
        <NavElement>
          <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
            Home
          </Link>
        </NavElement>
        <NavElement>
          <Link style={{ textDecoration: "none", color: "#fff" }} to="/notes">
            Notes
          </Link>
        </NavElement>
        <NavElement>
          <Link style={{ textDecoration: "none", color: "#fff" }} to="/about">
            About
          </Link>
        </NavElement>
        <NavElement>
          <AuthButton>Log out</AuthButton>
        </NavElement>
      </LinksGroup>
    </Nav>
  );
}

export default Navigation;
