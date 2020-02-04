import React, { useState } from 'react';
import { connect } from 'react-redux';
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
} from './navigation-elements';
import { Link } from 'react-router-dom';
import { Icon } from '../../UI/theme';
import { signOut } from '../../firebase/firebaseAuth';

function DesktopNav({ isLoggedIn }) {
  return (
    <DesktopLinksGroup>
      <NavElement>
        <Link style={{ textDecoration: 'none', color: '#fff' }} to="/">
          Home
        </Link>
      </NavElement>
      {isLoggedIn && (
        <NavElement>
          <Link style={{ textDecoration: 'none', color: '#fff' }} to="/notes">
            Notes
          </Link>
        </NavElement>
      )}
      <NavElement>
        <Link style={{ textDecoration: 'none', color: '#fff' }} to="/about">
          About
        </Link>
      </NavElement>
      {isLoggedIn && (
        <NavElement>
          <AuthButton onClick={signOut}>Log out</AuthButton>
        </NavElement>
      )}
    </DesktopLinksGroup>
  );
}
function MobileNav({ isLoggedIn }) {
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
            style={{ textDecoration: 'none', color: '#fff' }}
            to="/"
          >
            <Icon className="fas fa-home" /> Home
          </Link>
        </NavMobileElement>
        {isLoggedIn && (
          <NavMobileElement>
            <Link
              onClick={() => toggleMobileNav(!isMobileNavOpen)}
              style={{ textDecoration: 'none', color: '#fff' }}
              to="/notes"
            >
              <Icon className="far fa-clipboard" /> Notes
            </Link>
          </NavMobileElement>
        )}
        <NavMobileElement>
          <Link
            onClick={() => toggleMobileNav(!isMobileNavOpen)}
            style={{ textDecoration: 'none', color: '#fff' }}
            to="/about"
          >
            <Icon className="fas fa-info" /> About
          </Link>
        </NavMobileElement>
        {isLoggedIn && (
          <NavMobileElement>
            <AuthButton
              onClick={() => {
                signOut();
                toggleMobileNav(!isMobileNavOpen);
              }}
            >
              <Icon className="fas fa-sign-out-alt" /> Log out
            </AuthButton>
          </NavMobileElement>
        )}
        <CloseNavBtn onClick={() => toggleMobileNav(!isMobileNavOpen)}>
          <Icon className="fas fa-times" /> Close
        </CloseNavBtn>
      </MobileLinksGroup>
    </>
  );
}

function Navigation({ isLoggedIn }) {
  return (
    <Nav>
      <Title>Google Keep Clone</Title>
      {window.innerWidth <= 720 ? (
        <MobileNav isLoggedIn={isLoggedIn} />
      ) : (
        <DesktopNav isLoggedIn={isLoggedIn} />
      )}
    </Nav>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};

export default connect(mapStateToProps, {})(Navigation);
