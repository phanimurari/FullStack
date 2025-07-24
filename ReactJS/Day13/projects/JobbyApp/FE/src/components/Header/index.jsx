import React from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import {
  HeaderContainer,
  HeaderLogo,
  Pages,
  PageLink,
  PageName,
  LogoutButton,
  MobileNavbar,
  MobileHeaderLogo,
  NavBarImage,
  NavMobileButton
} from './styledComponents'

const Header = props => {
  const navigate = useNavigate()

  const onClickLogOut = () => {
    Cookies.remove("jwt_token")
    navigate("/login")
  }

  return (
    <>
      <HeaderContainer>
        <PageLink to="/">
          <li>
            <HeaderLogo
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </li>
        </PageLink>

        <Pages>
          <PageLink to="/">
            <li>
              <PageName>Home</PageName>
            </li>
          </PageLink>
          <PageLink to="/jobs">
            <li>
              <PageName>Jobs</PageName>
            </li>
          </PageLink>
        </Pages>

        <LogoutButton type="button" onClick={onClickLogOut}>
          Logout
        </LogoutButton>
      </HeaderContainer>

      <MobileNavbar>
        <PageLink to="/">
          <MobileHeaderLogo
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </PageLink>
        
        <NavMobileButton>
          <NavBarImage
            src="https://assets.ccbp.in/frontend/react-js/mobile-menu-icon.png"
            alt="mobile menu"
          />
        </NavMobileButton>
      </MobileNavbar>
    </>
  )
}

export default Header
