import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import {
  InputField,
  SubmitButton,
  FormHeader,
  FormContainer,
  Label,
  InputErrMsg
} from './common-elements';
import { Card } from '../../UI/theme';
import { createUserWithEmailAndPassword } from '../../firebase/firebaseAuth';
import { withRouter } from 'react-router-dom';

function RegisterForm(props) {
  const [signUpState] = useState({
    email: '',
    password: '',
    name: '',
    repeatedPassword: ''
  });

  return (
    <Card>
      <FormHeader>Register by email</FormHeader>
      <Formik
        initialValues={{ ...signUpState }}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .min(2, 'Name is to short!')
            .max(10, 'Name is to long!')
            .required('Name is required!'),
          email: Yup.string()
            .email('Invalid email')
            .required('Email is required!'),
          password: Yup.string()
            .min(2, 'Password is to short!')
            .max(10, 'Password is to long!')
            .required('Password is required!'),
          repeatedPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Password is required!')
        })}
        onSubmit={({ email, password }, { setErrors, resetForm }) => {
          createUserWithEmailAndPassword(email, password)
            .then(() => {
              resetForm();
              //TODO SHOW TOAST
              setTimeout(() => {
                props.history.push('/notes');
              }, 500);
            })
            .catch((error) => {
              //TODO check if there is possible to get multiply of errors message
              const errorCode = error.code;
              if (errorCode === 'auth/weak-password') {
                setErrors({ password: 'Password is to weak!' });
              } else if (errorCode === 'auth/invalid-email') {
                setErrors({ email: 'Invalid Email' });
              } else if (errorCode === 'auth/email-already-in-use') {
                setErrors({ email: 'Email already in use!' });
              } else if (errorCode === 'auth/operation-not-allowed') {
                setErrors({
                  email: 'Invalid Email',
                  password: 'Invalid password'
                });
              } else {
                setErrors({
                  email: 'Invalid Email',
                  password: 'Invalid password'
                });
              }
            });
        }}
        render={({ handleChange, values, errors, touched, handleBlur }) => (
          <Form>
            <FormContainer>
              <Label htmlFor="name">Name</Label>
              <InputField
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={errors.name && touched.name}
                value={values.name}
                placeholder="Enter name"
                id="name"
                name="name"
              />
              <InputErrMsg isInvalid={errors.name && touched.name}>
                {errors.name}
              </InputErrMsg>
              <Label htmlFor="email">Email</Label>
              <InputField
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={errors.email && touched.email}
                value={values.email}
                placeholder="Enter email"
                id="email"
                name="email"
              />
              <InputErrMsg isInvalid={errors.email && touched.email}>
                {errors.email}
              </InputErrMsg>
              <Label htmlFor="password">Password</Label>
              <InputField
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={errors.password && touched.password}
                value={values.password}
                placeholder="Enter password"
                type="password"
                id="password"
                name="password"
              />
              <InputErrMsg isInvalid={errors.password && touched.password}>
                {errors.password}
              </InputErrMsg>
              <Label htmlFor="repeatedPassword">Repeat password</Label>
              <InputField
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={errors.repeatedPassword && touched.repeatedPassword}
                value={values.repeatedPassword}
                placeholder="Repeat password"
                type="password"
                id="repeatedPassword"
                name="repeatedPassword"
              />
              <InputErrMsg
                isInvalid={errors.repeatedPassword && touched.repeatedPassword}
              >
                {errors.repeatedPassword}
              </InputErrMsg>
              <SubmitButton disabled={props.isLoggedIn} type="submit">
                Sign up <span className="fas fa-user-plus" />
              </SubmitButton>
            </FormContainer>
          </Form>
        )}
      />
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};

export default withRouter(connect(mapStateToProps, {})(RegisterForm));
