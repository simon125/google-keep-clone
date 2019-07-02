import React from "react";
import LogInForm from "./LogInForm";
import RegisterForm from "./RegisterForm";
import SocialsAuth from "./SocialsAuth";
import { AuthContainer } from "./common-elements";

function AuthForm() {
  return (
    <AuthContainer>
      <RegisterForm />
      <LogInForm />
      <SocialsAuth />
    </AuthContainer>
  );
}

export default AuthForm;
