import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaGoogle } from 'react-icons/fa';
import {
  RegisterContainer,
  RegisterCard,
  FormContainer,
  InputLabel,
  InputContainer,
  RegisterButton,
  ErrorMessage,
  LoadingSpinner,
  GoogleButton,
  SignInText,
  LeftSection,
  RightSection,
  Title,
  Description,
} from './styledComponents';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const onChangeUsername = event => {
    setUsername(event.target.value);
    setErrorMsg('');
  };

  const onChangeEmail = event => {
    setEmail(event.target.value);
    setErrorMsg('');
  };

  const onChangePassword = event => {
    setPassword(event.target.value);
    setErrorMsg('');
  };

  const onClickRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const data = await register(username, email, password);
      if (data.user.role === 'admin') {
        navigate('/admin-dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  const isFormValid = username.trim() !== '' && email.trim() !== '' && password.trim() !== '';

  return (
    <RegisterContainer>
      <Title>Signup!</Title>
      <RegisterCard>
        <LeftSection>
          <Title>BlogApp</Title>
          <Description>
            You can sign up with your email and password or with Google.
          </Description>
        </LeftSection>
        <RightSection>
          <FormContainer onSubmit={onClickRegister}>
            <InputLabel htmlFor="username">
              Your username
            </InputLabel>
            <InputContainer
              id="username"
              type="text"
              placeholder="Username"
              onChange={onChangeUsername}
              value={username}
              disabled={isLoading}
            />
            
            <InputLabel htmlFor="email">
              Your email
            </InputLabel>
            <InputContainer
              id="email"
              type="email"
              placeholder="name@company.com"
              onChange={onChangeEmail}
              value={email}
              disabled={isLoading}
            />
            
            <InputLabel htmlFor="password">
              Your password
            </InputLabel>
            <InputContainer
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
              {isLoading && <LoadingSpinner />}
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </RegisterButton>
              <GoogleButton as="a" href="http://localhost:8005/api/auth/google">
                <FaGoogle />Continue with Google
              </GoogleButton>
            {errorMsg && (
              <ErrorMessage>
                *{errorMsg}
              </ErrorMessage>
            )}
          </FormContainer>
          <SignInText>
            Have an account? <Link to="/login">Sign In</Link>
          </SignInText>
        </RightSection>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;
