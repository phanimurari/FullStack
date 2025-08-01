import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  a {
    text-decoration: none;
    color: #343a40;
  }
`;

export const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const NavLink = styled.div`
  color: #495057;
  text-decoration: none;
  font-size: 1rem;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const LogoutButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;
