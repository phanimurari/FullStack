import {
  HomeContainer,
  MainHeading,
  StyledImage,
} from './styledComponents';

const Home = () => {
  return (
    <HomeContainer>
      <MainHeading>Development in Progress</MainHeading>
      <StyledImage src="https://cdn.dribbble.com/userupload/22866416/file/original-79954486027de6600487dfbc4eb0f7a1.gif" alt="Development in progress" />
    </HomeContainer>
  );
};

export default Home;
