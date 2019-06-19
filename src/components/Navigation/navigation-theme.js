import styled from "styled-components";

export const Nav = styled.nav`
  height: 80px;
  background-color: #f4b400;
  display: flex;
  justify-content: space-between;
  color: #fff;
  padding: 0 30px;
  align-items: center;
  @media (max-width: 959px) {
    height: 50px;
  }
`;
export const DesktopLinksGroup = styled.ul`
  margin-right: 100px;
  display: flex;
  list-style: none;
`;
export const NavElement = styled.li`
  margin: 0 15px;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.1);
  }
`;
export const AuthButton = styled.a`
  text-decoration: none;
  color: #fff;
`;

export const Title = styled.h1`
  @media (max-width: 959px) {
    font-size: calc(1.1rem + 16 * (100vw - 320px) / (960 - 320));
    line-height: calc(110% + 3.2 * (100vw - 960px) / (320 - 960));
  }
`;

export const Hamburger = styled.button`
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
`;

export const MobileLinksGroup = styled.ul`
  margin: 0;
  padding: 0;
  border: none;
  transition: all 0.3s;
  overflow: hidden;
  height ${props => (props.isOpen ? "100vh" : "0")};
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  background: rgba(0,0,0,0.8);
`;

export const CloseNavBtn = styled.button`
  color: #fff;
  outline: none;
  border: none;
  background: transparent;
  margin-top: 20px;
  font-size: 30px;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.1);
  }
`;
export const NavMobileElement = styled(NavElement)`
  margin-top: 20px;
  font-size: 30px;
`;
