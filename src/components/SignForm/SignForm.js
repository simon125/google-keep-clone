import React from "react";
import styled from "styled-components";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const FormContainer = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
`;

function SignForm() {
  return (
    <FormContainer>
      <SignUpForm />
      <SignInForm />
    </FormContainer>
  );
}

export default SignForm;
