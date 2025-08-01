import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HeaderContainer, Title, NavLinks, NavLink, LogoutButton } from './styledComponents';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <HeaderContainer>
      <Title>
        <Link to="/">BlogApp</Link>
      </Title>
      <NavLinks>
        {isAuthenticated ? (
          <>
            <NavLink>Welcome, {user.username}</NavLink>
            <LogoutButton onClick={logout}>Logout</LogoutButton>
          </>
        ) : (
          <>
            <NavLink as={Link} to="/login">Login</NavLink>
            <NavLink as={Link} to="/register">Register</NavLink>
          </>
        )}
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header;
