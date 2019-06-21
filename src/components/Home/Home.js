import React from "react";
import AuthForm from "../AuthForm/AuthForm";
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

function Home() {
  return (
    <HomeContainer>
      <AuthForm />
    </HomeContainer>
  );
}

export default Home;
