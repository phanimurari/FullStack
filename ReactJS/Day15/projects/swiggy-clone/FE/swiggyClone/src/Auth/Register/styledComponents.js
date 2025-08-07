import styled from 'styled-components'

export const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 20px;
`

export const RegisterCard = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  width: 100%;
  max-width: 900px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

export const LeftSection = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url('https://tasty-kitchens-app.web.app/static/media/LoginImg.772d869c56219048bad2.png');
  background-size: cover;
  background-position: center;
`

export const RightSection = styled.div`
  flex: 1;
  padding: 40px;
  background-color: #f9fafb;
`

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: orange;
  margin-bottom: 20px;
`

export const Description = styled.p`
  font-size: 1rem;
  color: #fff;
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const InputLabel = styled.label`
  color: #111827;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  margin-top: 16px;
`

export const InputContainer = styled.input`
  background-color: #ffffff;
  padding: 12px 20px;
  outline: none;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  color: #111827;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  transition: all 0.2s ease;

  &::placeholder {
    color: #9ca3af;
    font-size: 14px;
  }

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`

export const RegisterButton = styled.button`
  background: linear-gradient(to right, #8a2be2, #ff1493);
  margin-top: 24px;
  outline: none;
  border: none;
  color: #ffffff;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 600;
  padding: 12px 0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`

export const GoogleButton = styled.button`
  background-color: #ffffff;
  margin-top: 16px;
  outline: none;
  border: 1px solid #d1d5db;
  color: #111827;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 600;
  padding: 12px 0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 8px;
  }

  &:hover {
    background-color: #f9fafb;
  }
`

export const SignInText = styled.p`
  margin-top: 16px;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  color: #6b7280;
  text-align: center;

  a {
    color: #6366f1;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`

export const ErrorMessage = styled.p`
  align-self: flex-start;
  margin: 8px 0 0 0;
  font-family: 'Roboto';
  font-size: 14px;
  line-height: 16px;
  color: #ef4444;
  background-color: #fee2e2;
  padding: 8px 12px;
  border-radius: 4px;
  border-left: 3px solid #ef4444;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
  display: inline-block;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`
