import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  InputField,
  SubmitButton,
  Socials,
  FacebookBtn,
  GoogleBtn
} from "./common-theme";

const SignInFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const RememberMeSection = styled.div``;

function SignInForm() {
  const [signInState, setFormState] = useState({
    email: "",
    password: ""
  });

  return (
    <Formik
      initialValues={{ ...signInState }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Invalid email")
          .required("Required"),
        password: Yup.string()
          .min(2)
          .max(10)
          .required()
      })}
      render={({ handleChange, errors, values }) => (
        <Form>
          <SignInFormContainer>
            <InputField placeholder="Email..." id="email" name="email" />
            <InputField
              placeholder="Password..."
              type="password"
              id="password"
              name="password"
            />
            <SubmitButton>
              Sign in <span className="fas fa-sign-in-alt" />
            </SubmitButton>
            <label htmlFor="rememberMe">Remember me</label>
            <input type="checkbox" onChange={() => {}} id="rememberMe" />
            <p style={{ textAlign: "center" }}>or</p>
            <Socials>
              <FacebookBtn>
                Sing in <span className="fab fa-facebook-square" />
              </FacebookBtn>
              <GoogleBtn>
                Sing in <span className="fab fa-google" />
              </GoogleBtn>
            </Socials>
          </SignInFormContainer>
        </Form>
      )}
    />
  );
}

export default SignInForm;
