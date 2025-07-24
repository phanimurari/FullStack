import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  RegisterContainer,
  RegisterForm,
  RegisterInput,
  RegisterButton,
  ErrorMessage
} from './styledComponents';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitStatus, setSubmitStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onChangeUsername = event => {
    setUsername(event.target.value);
    // Clear error when user starts typing
    if (submitStatus) {
      setSubmitStatus(false);
      setErrorMsg('');
    }
  };

  const onChangeEmail = event => {
    setEmail(event.target.value);
    // Clear error when user starts typing
    if (submitStatus) {
      setSubmitStatus(false);
      setErrorMsg('');
    }
  };

  const onChangePassword = event => {
    setPassword(event.target.value);
    // Clear error when user starts typing
    if (submitStatus) {
      setSubmitStatus(false);
      setErrorMsg('');
    }
  };

  const showSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 20,
    });
    navigate('/', { replace: true });
  };

  const showFailureText = error => {
    setErrorMsg(error);
    setSubmitStatus(true);
    setIsLoading(false);
  };

  const onClickRegister = event => {
    event.preventDefault();
    setIsLoading(true);

    const registerDetails = {
      username,
      email,
      password,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerDetails),
    };

    const doRegister = async () => {
      try {
        const response = await fetch('https://jobbyapp-be.onrender.com/api/auth/register', options);
        const data = await response.json();
        if (data.success === true) {
          showSuccess(data.token);
        } else {
          showFailureText(data.message);
        }
      } catch (error) {
        showFailureText('Something went wrong. Please try again later.');
      }
    };

    doRegister();
  };

  const jwtToken = Cookies.get('jwt_token');
  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  const isFormValid = username.trim() !== '' && email.trim() !== '' && password.trim() !== '';

  return (
    <RegisterContainer>
      <RegisterForm onSubmit={onClickRegister}>
        <RegisterInput
          id="username"
          type="text"
          placeholder="Username"
          onChange={onChangeUsername}
          value={username}
          disabled={isLoading}
        />

        <RegisterInput
          id="email"
          type="email"
          placeholder="Email"
          onChange={onChangeEmail}
          value={email}
          disabled={isLoading}
        />

        <RegisterInput
          id="password"
          type="password"
          placeholder="Password"
          onChange={onChangePassword}
          value={password}
          disabled={isLoading}
        />

        <RegisterButton
          type="submit"
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </RegisterButton>

        {submitStatus && (
          <ErrorMessage>
            *{errorMsg}
          </ErrorMessage>
        )}
      </RegisterForm>
    </RegisterContainer>
  );
};

export default Register;
