import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { InputField, SubmitButton } from "./common-theme";

const SignUpFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function SignUpForm() {
  const [signUpState, setFormState] = useState({
    email: "",
    password: "",
    name: "",
    repeatedPassword: ""
  });

  return (
    <Formik
      initialValues={{ ...signUpState }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .min(2)
          .max(10)
          .required(),
        email: Yup.string()
          .email("Invalid email")
          .required("Required"),
        password: Yup.string()
          .min(2)
          .max(10)
          .required(),
        repeatedPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Required")
      })}
      render={({ handleChange, values, errors, touched }) => (
        <Form>
          <SignUpFormContainer>
            <InputField
              onChange={handleChange}
              value={values.name}
              placeholder="Name..."
              id="name"
              name="name"
            />
            <InputField
              onChange={handleChange}
              value={values.email}
              placeholder="Email..."
              id="email"
              name="email"
            />
            <InputField
              onChange={handleChange}
              value={values.password}
              placeholder="Password..."
              type="password"
              id="password"
              name="password"
            />
            <InputField
              onChange={handleChange}
              value={values.repeatedPassword}
              placeholder="Confirm passowrd..."
              type="password"
              id="repeatedPassword"
              name="repeatedPassword"
            />
            <SubmitButton>
              Sign up <span className="fas fa-user-plus" />
            </SubmitButton>
          </SignUpFormContainer>
        </Form>
      )}
    />
  );
}

export default SignUpForm;
