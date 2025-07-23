import styled from 'styled-components'

export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  height: 100vh;
  margin-top: 0px;
  padding: 20px;
`

export const LoginCard = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #272727;
  width: 80%;
  border-radius: 10px;
  padding: 50px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
  }

  @media screen and (min-width: 768px) {
    width: 40%;
    max-width: 500px;
  }

  @media screen and (max-width: 480px) {
    padding: 30px 20px;
    width: 95%;
  }
`

export const WebsiteLogo = styled.img`
  height: 40px;
  width: auto;
  margin-bottom: 20px;

  @media screen and (min-width: 768px) {
    height: 50px;
  }
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 60px;

  @media screen and (max-width: 480px) {
    margin-top: 40px;
  }
`

export const InputLabel = styled.label`
  color: #ffffff;
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
  margin-top: 20px;
  letter-spacing: 0.5px;

  &:first-child {
    margin-top: 0;
  }
`

export const InputContainer = styled.input`
  background-color: transparent;
  padding: 12px 20px;
  outline: none;
  border: 1px solid #64748b;
  border-radius: 4px;
  color: #ffffff;
  font-family: 'Roboto';
  font-size: 16px;
  transition: all 0.2s ease;

  &::placeholder {
    color: #94a3b8;
    font-size: 14px;
  }

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
    background-color: rgba(255, 255, 255, 0.05);
  }

  &:hover {
    border-color: #7c3aed;
  }

  @media screen and (max-width: 480px) {
    font-size: 14px;
    padding: 10px 15px;
  }
`

export const LoginButton = styled.button`
  background-color: #4f46e5;
  margin-top: 40px;
  outline: none;
  border: none;
  color: #ffffff;
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: 600;
  padding: 12px 0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background-color: #4338ca;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(79, 70, 229, 0.3);
  }

  &:disabled {
    background-color: #6b7280;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media screen and (max-width: 480px) {
    font-size: 14px;
    margin-top: 30px;
  }
`

export const ErrorMessage = styled.p`
  align-self: flex-start;
  margin: 8px 0 0 0;
  font-family: 'Roboto';
  font-size: 14px;
  line-height: 16px;
  color: #ff0b37;
  background-color: rgba(255, 11, 55, 0.1);
  padding: 8px 12px;
  border-radius: 4px;
  border-left: 3px solid #ff0b37;
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

  @media screen and (max-width: 480px) {
    font-size: 12px;
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

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`
