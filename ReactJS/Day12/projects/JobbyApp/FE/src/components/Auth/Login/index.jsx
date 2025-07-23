import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { Navigate, useNavigate } from 'react-router-dom'
import {
  LoginContainer,
  LoginCard,
  WebsiteLogo,
  FormContainer,
  InputLabel,
  InputContainer,
  LoginButton,
  ErrorMessage,
  LoadingSpinner
} from './styledComponents'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [submitStatus, setSubmitStatus] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const onChangeUsername = event => {
    setUsername(event.target.value)
    // Clear error when user starts typing
    if (submitStatus) {
      setSubmitStatus(false)
      setErrorMsg('')
    }
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
    // Clear error when user starts typing
    if (submitStatus) {
      setSubmitStatus(false)
      setErrorMsg('')
    }
  }

  const showSuccess = (token, user) => {
    // Store JWT token
    Cookies.set('jwt_token', token, {
      expires: 20,
    })
    
    // Store user data
    Cookies.set('user_data', JSON.stringify(user), {
      expires: 20,
    })
    
    // Redirect based on role
    if (user.role === 'admin') {
      navigate('/admin-dashboard', { replace: true })
    } else {
      navigate('/', { replace: true })
    }
  }

  const showFailureText = error => {
    setErrorMsg(error)
    setSubmitStatus(true)
    setIsLoading(false)
  }

  const onClickLogin = event => {
    event.preventDefault()
    setIsLoading(true)

    const loginDetails = {
      email: username,
      password, // encrypted pasword
    }

  

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginDetails),
    }

    const doLogin = async () => {
      try {
        const response = await fetch('https://jobbyapp-be.onrender.com/api/auth/login', options)
        const data = await response.json()
        
        if (response.ok && data.success) {
          showSuccess(data.token, data.user)
        } else {
          // Handle error message from new API structure
          const errorMessage = data.message || 'Login failed. Please try again.'
          showFailureText(errorMessage)
        }
      } catch (error) {
        console.error('Login error:', error)
        showFailureText('Something went wrong. Please try again later.')
      }
    }

    doLogin()
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Navigate to="/" />
  }

  const isFormValid = username.trim() !== '' && password.trim() !== ''

  return (
    <LoginContainer>
      <LoginCard>
        <WebsiteLogo
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <FormContainer onSubmit={onClickLogin}>
          <InputLabel htmlFor="username">
            Email
          </InputLabel>
          <InputContainer
            id="username"
            type="text"
            placeholder="Username"
            onChange={onChangeUsername}
            value={username}
            disabled={isLoading}
          />
          
          <InputLabel htmlFor="password">
            PASSWORD
          </InputLabel>
          <InputContainer
            id="password"
            type="password"
            placeholder="Password"
            onChange={onChangePassword}
            value={password}
            disabled={isLoading}
          />
          
          <LoginButton 
            type="submit" 
            disabled={!isFormValid || isLoading}
          >
            {isLoading && <LoadingSpinner />}
            {isLoading ? 'Logging in...' : 'Login'}
          </LoginButton>
          
          {submitStatus && (
            <ErrorMessage>
              *{errorMsg}
            </ErrorMessage>
          )}
        </FormContainer>
      </LoginCard>
    </LoginContainer>
  )
}

export default Login
