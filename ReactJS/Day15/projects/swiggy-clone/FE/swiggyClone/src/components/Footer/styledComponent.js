import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #0f172a;
  color: #fff;
  padding: 2rem 0;
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

export const FooterLogo = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const FooterText = styled.p`
  margin-bottom: 1rem;
  text-align: center;
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

export const SocialIcon = styled.a`
  color: #fff;
  font-size: 1.5rem;
  transition: color 0.3s;

  &:hover {
    color: #f7931e;
  }
`;
