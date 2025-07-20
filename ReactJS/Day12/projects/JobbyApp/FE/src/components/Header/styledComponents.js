import styled from 'styled-components'
import { Link } from 'react-router-dom'

// Styled Components
export const HeaderContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #272727;
  padding: 20px 30px 10px 30px;
  list-style-type: none;
  margin: 0px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const HeaderLogo = styled.img`
  height: 30px;
  width: 100px;
`

export const Pages = styled.div`
  display: flex;
`

export const PageLink = styled(Link)`
  text-decoration: none;
`

export const PageName = styled.p`
  color: #ffffff;
  font-family: 'Roboto';
  margin-right: 10px;
`

export const LogoutButton = styled.button`
  background-color: #4f46e5;
  color: white;
  font-size: 12px;
  outline: none;
  border: none;
  padding: 7px 15px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`

export const MobileNavbar = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    background-color: #272727;
    display: flex;
    padding: 15px;
    justify-content: space-between;
    align-items: center;
  }
`

export const MobileHeaderLogo = styled.img`
  height: 70px;
  width: 140px;
`

export const NavBarImage = styled.img`
  width: 50px;
  margin-left: 40px;
`

export const NavMobileButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
`
