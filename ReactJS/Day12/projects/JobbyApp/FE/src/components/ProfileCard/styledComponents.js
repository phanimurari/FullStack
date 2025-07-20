import styled from 'styled-components'

export const FilterSection = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/profile-bg.png');
  background-size: cover;
  width: 100%;
  max-width: 330px;
  height: 210px;
  padding: 40px 20px 20px 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;

  @media screen and (max-width: 768px) {
    height: 180px;
    padding: 30px 15px 15px 15px;
  }
`

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-bottom: 15px;
  border: 2px solid rgba(255, 255, 255, 0.2);
`

export const ProfileUsername = styled.h1`
  font-size: 20px;
  font-weight: 600;
  font-family: 'Roboto';
  color: #6366f1;
  margin: 0 0 15px 0;
  line-height: 1.2;

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`

export const ProfileBio = styled.p`
  color: #2c364c;
  font-weight: 400;
  font-family: 'Roboto';
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  flex: 1;

  @media screen and (max-width: 768px) {
    font-size: 13px;
  }
`

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 330px;
  height: 210px;
  background-color: #272727;
  border-radius: 20px;
  color: #ffffff;
  font-family: 'Roboto';

  h1 {
    font-size: 18px;
    font-weight: 500;
    margin: 0;
    color: #ffffff;
  }

  @media screen and (max-width: 768px) {
    height: 180px;
    
    h1 {
      font-size: 16px;
    }
  }
`

export const RetryButton = styled.button`
  background-color: #4f46e5;
  color: white;
  font-size: 14px;
  outline: none;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-family: 'Roboto';
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #4338ca;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(79, 70, 229, 0.3);
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
    padding: 10px 20px;
  }
`
