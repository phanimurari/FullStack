import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { MdNoFood } from 'react-icons/md';
import {
  fetchRestaurantDetails,
  addToCart,
  updateCart,
} from '../../redux/restaurants/restaurantsActions';

const RestaurantDetailContainer = styled.div`
  padding: 20px;
`;

const RestaurantHeader = styled.div`
  display: flex;
  align-items: center;
  background-color: #333;
  color: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;

  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    margin-right: 20px;
  }

  .details {
    h1 {
      margin: 0;
    }

    p {
      margin: 5px 0;
    }
  }
`;

const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const MenuItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  align-items: center;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
    margin-right: 15px;
  }

  .item-details {
    h3 {
      margin: 0;
    }

    p {
      margin: 5px 0;
    }

    button {
      background-color: #f0ad4e;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;

const NoFoodContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 50px;

  h3 {
    color: orange;
    font-size: 24px;
  }

  button {
    background-color: orange;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }

  svg {
    color: orange;
    font-size: 50px;
    margin-bottom: 10px;
  }
`;

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    restaurantDetails: restaurant,
    loading,
    error,
    cart,
    isCartUpdating,
  } = useSelector((state) => state.restaurants);

  useEffect(() => {
    dispatch(fetchRestaurantDetails(id));
  }, [dispatch, id]);

  const handleCartUpdate = (foodItemId, quantity) => {
    dispatch(addToCart({ restaurantId: id, foodItemId, quantity }));
  };

  const handleAddItem = (item) => {
    const newCart = { ...cart, [item.id]: 1 };
    dispatch(updateCart(newCart));
    handleCartUpdate(item.id, 1);
  };

  const handleIncrement = (item) => {
    const newQuantity = (cart[item.id] || 0) + 1;
    const newCart = { ...cart, [item.id]: newQuantity };
    dispatch(updateCart(newCart));
    handleCartUpdate(item.id, newQuantity);
  };

  const handleDecrement = (item) => {
    const newQuantity = (cart[item.id] || 0) - 1;
    if (newQuantity > 0) {
      const newCart = { ...cart, [item.id]: newQuantity };
      dispatch(updateCart(newCart));
      handleCartUpdate(item.id, newQuantity);
    } else {
      const newCart = { ...cart };
      delete newCart[item.id];
      dispatch(updateCart(newCart));
      handleCartUpdate(item.id, 0);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <RestaurantDetailContainer>
      <RestaurantHeader>
        <img src={restaurant.image_url} alt={restaurant.name} />
        <div className="details">
          <h1>{restaurant.name}</h1>
          <p>{restaurant.cuisine}</p>
          <p>{restaurant.location}</p>
          <p>
            <span>⭐ {restaurant.rating}</span> | <span>{restaurant.reviews_count} ratings</span> | <span>Cost for two: ₹{restaurant.cost_for_two}</span>
          </p>
        </div>
      </RestaurantHeader>
      <h2>Menu</h2>
      {restaurant.food_items.length === 0 ? (
        <NoFoodContainer>
          <MdNoFood />
          <h3>No Food Items are added, change Resturant</h3>
          <button onClick={() => navigate('/')}>Home</button>
        </NoFoodContainer>
      ) : (
        <MenuContainer>
          {restaurant.food_items.map((item) => (
            <MenuItem key={item.id}>
              <img src={item.image_url} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>₹{item.cost}</p>
                <p>⭐ {item.rating}</p>
                {cart[item.id] ? (
                  <div>
                    <button
                      onClick={() => handleDecrement(item)}
                      disabled={isCartUpdating}
                    >
                      -
                    </button>
                    <span>{cart[item.id]}</span>
                    <button
                      onClick={() => handleIncrement(item)}
                      disabled={isCartUpdating}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddItem(item)}
                    disabled={isCartUpdating}
                  >
                    {isCartUpdating ? 'Adding...' : 'ADD'}
                  </button>
                )}
              </div>
            </MenuItem>
          ))}
        </MenuContainer>
      )}
    </RestaurantDetailContainer>
  );
};

export default RestaurantDetail;
