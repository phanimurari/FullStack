import React from 'react';
import { FaInstagram, FaTwitter, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { FooterContainer, FooterContent, FooterLogo, FooterText, SocialIcons, SocialIcon } from './styledComponent';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogo>swiggy</FooterLogo>
        <FooterText>The only thing we are serious about is food.</FooterText>
        <FooterText>Contact Us</FooterText>
        <SocialIcons>
          <SocialIcon href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </SocialIcon>
          <SocialIcon href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </SocialIcon>
          <SocialIcon href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </SocialIcon>
          <SocialIcon href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp />
          </SocialIcon>
        </SocialIcons>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
