import styled from "styled-components";
export const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fcfcfc;
`;
export const Card = styled.div`
  padding: 15px;
  margin: 5px;
  border-radius: 3px;
  box-sizing: border-box;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  background-color: #fff;
  @media (max-width: 500px) {
    margin: 5px 0;
  }
`;
export const Icon = styled.span`
  color: ${props => (props.color ? props.color : "#fff")};
`;
