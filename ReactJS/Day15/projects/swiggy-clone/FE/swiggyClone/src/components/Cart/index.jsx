import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import {
  fetchCart,
  updateCartItem,
  deleteCartItem,
  placeOrder,
} from '../../redux/cart/cartActions';
import {
  CartContainer,
  CartItem,
  OrderTotal,
  EmptyCartContainer,
} from './styledComponents';
import OrderSuccess from '../OrderSuccess';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading, error, orderPlaced } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrement = (item) => {
    dispatch(
      updateCartItem({
        restaurantId: item.restaurantId,
        foodItemId: item.foodItemId,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateCartItem({
          restaurantId: item.restaurantId,
          foodItemId: item.foodItemId,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(
        deleteCartItem({
          restaurantId: item.restaurantId,
          foodItemId: item.foodItemId,
        })
      );
    }
  };

  const handleDelete = (item) => {
    dispatch(
      deleteCartItem({
        restaurantId: item.restaurantId,
        foodItemId: item.foodItemId,
      })
    );
  };

  const handlePlaceOrder = () => {
    dispatch(placeOrder());
  };

  if (orderPlaced) {
    return <OrderSuccess />;
  }

  if (loading && !cart) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!cart || cart.cart.length === 0) {
    return (
      <EmptyCartContainer>
        <h3>Your cart is empty</h3>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </EmptyCartContainer>
    );
  }

  return (
    <CartContainer>
      <h1>Cart</h1>
      <div>
        {cart.cart.map((item) => (
          <CartItem key={item.foodItemId}>
            <img src={item.image_url} alt={item.name} />
            <div className="item-details">
              <h3>{item.name || 'Food Item'}</h3>
              <p>from {item.restaurant_name}</p>
            </div>
            <div className="quantity-controls">
              <button onClick={() => handleDecrement(item)} disabled={loading}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)} disabled={loading}>
                +
              </button>
            </div>
            <p className="price">₹ {item.price * item.quantity}</p>
            <button
              className="delete-btn"
              onClick={() => handleDelete(item)}
              disabled={loading}
            >
              <FaTrash />
            </button>
          </CartItem>
        ))}
      </div>
      <OrderTotal>
        <p>Subtotal: ₹ {cart.subTotal}</p>
        <p>Delivery Fee: ₹ {cart.deliveryFee}</p>
        <p>Order Total: ₹ {cart.total}</p>
        <div className="actions">
          <button disabled>Refresh</button>
          <button onClick={handlePlaceOrder} disabled={loading}>
            Place Order
          </button>
        </div>
      </OrderTotal>
    </CartContainer>
  );
};

export default Cart;
