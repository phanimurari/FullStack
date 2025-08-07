import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e0e0e0;
`;

export const Title = styled.div`
  a {
    text-decoration: none;
    color: #000000;
    display: flex;
    align-items: center;
  }
  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #f39c12;
  }
`;

export const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const NavLink = styled.div`
  text-decoration: none;
  font-size: 1.1rem;
  color: #333;
  cursor: pointer;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const LogoutButton = styled.button`
  background-color: #f39c12;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;

  &:hover {
    background-color: #e68a00;
  }
`;

export const AvatarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f39c12;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const AvatarInitials = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
