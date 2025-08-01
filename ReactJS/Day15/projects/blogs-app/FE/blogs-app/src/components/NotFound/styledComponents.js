import styled from 'styled-components'

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  min-height: 100vh;
  color: white;
  padding: 20px;
  text-align: center;
`

export const NotFoundImg = styled.img`
  width: 400px;
  max-width: 90%;
  height: auto;
  margin-bottom: 30px;
  animation: fadeIn 0.6s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media screen and (max-width: 768px) {
    width: 300px;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 480px) {
    width: 250px;
  }
`

export const NotFoundHeading = styled.h1`
  color: #ffffff;
  font-family: 'Roboto';
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 16px 0;
  animation: slideInUp 0.8s ease-out 0.2s both;

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 28px;
  }

  @media screen and (max-width: 480px) {
    font-size: 24px;
  }
`

export const NotFoundDescription = styled.p`
  color: #94a3b8;
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: 400;
  line-height: 1.5;
  max-width: 500px;
  margin: 0;
  animation: slideInUp 0.8s ease-out 0.4s both;

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 16px;
    max-width: 400px;
  }

  @media screen and (max-width: 480px) {
    font-size: 14px;
    max-width: 300px;
  }
`
