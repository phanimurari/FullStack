import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HeaderContainer, Title, NavLinks, NavLink, LogoutButton, PublishButton } from './styledComponents';

import { FaWhatsapp } from "react-icons/fa";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const titleFromUrl = urlParams.get('title');
    if (titleFromUrl) {
      setSearchTerm(titleFromUrl);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('title', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <HeaderContainer>
      <Title>
        <Link to="/">BlogApp</Link>
      </Title>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Search...'
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <NavLinks>
        {isAuthenticated ? (
          <>
            <NavLink>Welcome, {user.username}</NavLink>
            {user.role === 'admin' && (
              <PublishButton>
              <NavLink as={Link} to="/publish">
                Publish Blog
              </NavLink>
              </PublishButton>
            )}
            <LogoutButton onClick={logout}>Logout</LogoutButton>
          </>
        ) : (
          <>
            <NavLink as={Link} to="/login">Login</NavLink>
            <NavLink as={Link} to="/register">Register</NavLink>
          </>
        )}
      </NavLinks>
      <FaWhatsapp size={50} />
    </HeaderContainer>
  );
};

export default Header;
