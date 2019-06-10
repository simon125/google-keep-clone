import React from "react";
import SignForm from "../SignForm/SignForm";
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

function Home() {
  return (
    <HomeContainer>
      <SignForm />
    </HomeContainer>
  );
}

export default Home;
