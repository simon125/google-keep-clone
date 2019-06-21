import React, { useState } from "react";
import {
  DesktopLinksGroup,
  NavElement,
  AuthButton,
  Title,
  Nav,
  Hamburger,
  MobileLinksGroup,
  CloseNavBtn,
  NavMobileElement
} from "./navigation-theme";
import { Link } from "react-router-dom";
import { Icon } from "../../UI/theme";

function DesktopNav() {
  return (
    <DesktopLinksGroup>
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
    </DesktopLinksGroup>
  );
}
function MobileNav() {
  const [isMobileNavOpen, toggleMobileNav] = useState(false);
  return (
    <>
      <Hamburger onClick={() => toggleMobileNav(!isMobileNavOpen)}>
        <Icon className="fas fa-bars fa-2x" />
      </Hamburger>
      <MobileLinksGroup isOpen={isMobileNavOpen}>
        <NavMobileElement>
          <Link
            onClick={() => toggleMobileNav(!isMobileNavOpen)}
            style={{ textDecoration: "none", color: "#fff" }}
            to="/"
          >
            <Icon className="fas fa-home" /> Home
          </Link>
        </NavMobileElement>
        <NavMobileElement>
          <Link
            onClick={() => toggleMobileNav(!isMobileNavOpen)}
            style={{ textDecoration: "none", color: "#fff" }}
            to="/notes"
          >
            <Icon className="far fa-clipboard" /> Notes
          </Link>
        </NavMobileElement>
        <NavMobileElement>
          <Link
            onClick={() => toggleMobileNav(!isMobileNavOpen)}
            style={{ textDecoration: "none", color: "#fff" }}
            to="/about"
          >
            <Icon className="fas fa-info" /> About
          </Link>
        </NavMobileElement>
        <NavMobileElement>
          <AuthButton onClick={() => toggleMobileNav(!isMobileNavOpen)}>
            <Icon className="fas fa-sign-out-alt" /> Log out
          </AuthButton>
        </NavMobileElement>
        <CloseNavBtn onClick={() => toggleMobileNav(!isMobileNavOpen)}>
          <Icon className="fas fa-times" /> Close
        </CloseNavBtn>
      </MobileLinksGroup>
    </>
  );
}

function Navigation() {
  return (
    <Nav>
      <Title>Google Keep Clone</Title>
      {window.innerWidth <= 720 ? <MobileNav /> : <DesktopNav />}
    </Nav>
  );
}

export default Navigation;
