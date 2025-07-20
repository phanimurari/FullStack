import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const HomeContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/home-lg-bg.png');
  background-size: cover;
  min-height: 100vh;
`

export const HomeIntro = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 50px;
  min-height: 100vh;
  width: 40%;
`

export const HomeHeading = styled.h1`
  color: white;
  font-family: 'Roboto';
  font-size: 60px;
  font-weight: bold;
`

export const HomeDescription = styled.p`
  color: #ffffff;
  font-size: 26px;
  font-family: 'Roboto';
`

export const HomeButton = styled.button`
  margin-top: 20px;
  background-color: blue;
  color: white;
  font-family: 'Roboto';
  padding: 15px 20px;
  outline: none;
  border: none;
  font-size: 16px;
  font-weight: bold;
  width: 150px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`

export const JobsLink = styled(Link)`
  text-decoration: none;
`
