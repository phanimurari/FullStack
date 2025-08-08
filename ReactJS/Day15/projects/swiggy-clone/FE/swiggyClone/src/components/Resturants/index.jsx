import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RestaurantCard from '../RestaurantCard';
import {
  RestaurantsContainer,
  Title,
  Subtitle,
  SortContainer,
  SortSelect,
  CardGrid,
} from './styledComponent';
import { fetchRestaurants } from '../../redux/restaurants/restaurantsActions';

const Restaurants = () => {
  const dispatch = useDispatch();
  const { restaurants, loading, error } = useSelector(
    (state) => state.restaurants
  );
  const [sortBy, setSortBy] = useState('lowest');

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const sortedRestaurants = [...(restaurants || [])].sort((a, b) => {
    if (sortBy === 'lowest') {
      return a.user_rating.rating - b.user_rating.rating;
    } else {
      return b.user_rating.rating - a.user_rating.rating;
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <RestaurantsContainer>
      <Title>Popular Restaurants</Title>
      <Subtitle>
        Select your favourite restaurant special dish and make your day happy...
      </Subtitle>
      <SortContainer>
        <SortSelect onChange={handleSortChange} value={sortBy}>
          <option value="lowest">Sort by Lowest</option>
          <option value="highest">Sort by Highest</option>
        </SortSelect>
      </SortContainer>
      <CardGrid>
        {sortedRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </CardGrid>
    </RestaurantsContainer>
  );
};

export default Restaurants;
