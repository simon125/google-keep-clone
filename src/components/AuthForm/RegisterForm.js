import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  InputField,
  SubmitButton,
  FormHeader,
  FormContainer,
  Label
} from "./common-theme";
import { Card } from "../../UI/theme";

function RegisterForm() {
  const [signUpState, setFormState] = useState({
    email: "",
    password: "",
    name: "",
    repeatedPassword: ""
  });

  return (
    <Card>
      <FormHeader>Register by email</FormHeader>
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
            <FormContainer>
              <Label htmlFor="name">Name</Label>
              <InputField
                onChange={handleChange}
                value={values.name}
                placeholder="Enter name"
                id="name"
                name="name"
              />
              <Label htmlFor="email">Email</Label>
              <InputField
                onChange={handleChange}
                value={values.email}
                placeholder="Enter email"
                id="email"
                name="email"
              />
              <Label htmlFor="password">Password</Label>
              <InputField
                onChange={handleChange}
                value={values.password}
                placeholder="Enter password"
                type="password"
                id="password"
                name="password"
              />
              <Label htmlFor="repeatedPassword">Repeat password</Label>
              <InputField
                onChange={handleChange}
                value={values.repeatedPassword}
                placeholder="Repeat passowrd"
                type="password"
                id="repeatedPassword"
                name="repeatedPassword"
              />
              <SubmitButton>
                Sign up <span className="fas fa-user-plus" />
              </SubmitButton>
            </FormContainer>
          </Form>
        )}
      />
    </Card>
  );
}

export default RegisterForm;
