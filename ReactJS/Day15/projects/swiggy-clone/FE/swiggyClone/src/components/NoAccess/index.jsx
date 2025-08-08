import React from 'react';
import { Link } from 'react-router-dom';
import { NoAccessContainer, HomeButton } from './styledComponent';

const NoAccess = () => {
  return (
    <NoAccessContainer>
      <h1>You are not authorized to access this route</h1>
      <Link to="/">
        <HomeButton>Home</HomeButton>
      </Link>
    </NoAccessContainer>
  );
};

export default NoAccess;
