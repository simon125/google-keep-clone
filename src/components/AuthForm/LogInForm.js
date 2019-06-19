import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  InputField,
  SubmitButton,
  FormHeader,
  FormContainer,
  Label,
  RememberMeLabel
} from "./common-theme";
import { Card } from "../../UI/theme";

const RememberMeSection = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;
const Checkbox = styled.input`
  margin: 0 3px;
  background: transarent;
`;

function LogInForm() {
  const [signInState, setFormState] = useState({
    email: "",
    password: ""
  });

  return (
    <Card>
      <FormHeader>Login by email</FormHeader>
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
            <FormContainer>
              <Label htmlFor="email">Email</Label>
              <InputField
                placeholder="Enter your email"
                id="email"
                name="email"
              />
              <Label htmlFor="password">Password</Label>
              <InputField
                placeholder="Enter password"
                type="password"
                id="password"
                name="password"
              />
              <SubmitButton>
                Sign in <span className="fas fa-sign-in-alt" />
              </SubmitButton>
              <RememberMeSection>
                <Checkbox type="checkbox" onChange={() => {}} id="rememberMe" />
                <RememberMeLabel htmlFor="rememberMe">
                  Remember me
                </RememberMeLabel>
              </RememberMeSection>
            </FormContainer>
          </Form>
        )}
      />
    </Card>
  );
}

export default LogInForm;
