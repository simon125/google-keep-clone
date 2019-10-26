import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  height: 8vh;
  text-align: center;
  background: #f4b400;
  line-height: 70px;
  color: #fff;
  font-size: 20px;
  letter-spacing: 0.4px;
  @media (max-width: 959px) {
    height: 50px;
    line-height: 50px;
  }
`;

function Footer() {
  return <FooterContainer>Google Keep Clone</FooterContainer>;
}

export default Footer;
