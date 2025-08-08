import Offers from '../Offers';
import Restaurants from '../Resturants';
import {
  HomeContainer
} from './styledComponents';

const Home = () => {
  return (
    <HomeContainer>
      <Offers />
      <Restaurants />
    </HomeContainer>
  );
};

export default Home;
