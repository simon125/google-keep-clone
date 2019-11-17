import React from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 84vh;
  box-sizing: border-box;
  @media (max-width: 959px) {
    min-height: calc(100vh - 100px);
  }
`;

function Home() {
  return (
    <HomeContainer>
      <AuthForm />
    </HomeContainer>
  );
}

export default Home;
