import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FaGoogle } from 'react-icons/fa'
import {
  LoginContainer,
  LoginCard,
  FormContainer,
  InputLabel,
  InputContainer,
  LoginButton,
  ErrorMessage,
  LoadingSpinner,
  GoogleButton,
  SignUpText,
  LeftSection,
  RightSection,
  Title,
  Description,
} from './styledComponents'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const onChangeEmail = event => {
    setEmail(event.target.value)
    setErrorMsg('')
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
    setErrorMsg('')
  }

  const onClickLogin = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setErrorMsg('')

    try {
      const data = await login(email, password)
      if (data.user.role === 'admin') {
        navigate('/admin-dashboard', { replace: true })
      } else {
        navigate('/', { replace: true })
      }
    } catch (error) {
      setErrorMsg(error.message)
    } finally {
      setIsLoading(false)
    }
  }


  const isFormValid = email.trim() !== '' && password.trim() !== ''

  return (
    <LoginContainer>
      <Title>Hey Login!</Title>
      <LoginCard>
        <LeftSection>
          <Title>BlogApp</Title>
          <Description>
            You can sign in with your email and password or with Google.
          </Description>
        </LeftSection>
        <RightSection>
          <FormContainer onSubmit={onClickLogin}>
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
              placeholder="**********"
              onChange={onChangePassword}
              value={password}
              disabled={isLoading}
            />
            
            <LoginButton 
              type="submit" 
              disabled={!isFormValid || isLoading}
            >
              {isLoading && <LoadingSpinner />}
              {isLoading ? 'Signing in...' : 'Sign In'}
            </LoginButton>
            <GoogleButton as="a" href="http://localhost:8005/api/auth/google">
              <FaGoogle />
              Continue with Google
            </GoogleButton>
            
            {errorMsg && (
              <ErrorMessage>
                *{errorMsg}
              </ErrorMessage>
            )}
          </FormContainer>
          <SignUpText>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </SignUpText>
        </RightSection>
      </LoginCard>
    </LoginContainer>
  )
}

export default Login
