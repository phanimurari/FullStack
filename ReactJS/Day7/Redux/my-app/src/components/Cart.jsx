import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, partialCheckOut } from '../redux/actions/cartActions';
import CartItem from './CartItem';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  
  // Calculate total using useSelector for automatic updates
  const total = useSelector(state => 
    state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );
  
  const handleClearCart = () => {
    dispatch(clearCart());
  };


  const handlerForPratialCheckout = () => {
    dispatch(partialCheckOut())
  }
  
  if (cart.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Shopping Cart ({cart.length} items)</h2>
        <button
          onClick={handleClearCart}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear Cart
        </button>

<button
          onClick={handlerForPratialCheckout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Partial Checkout
        </button>

      </div>
      
      <div className="space-y-4 mb-6">
        {cart.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">Total: ${total.toFixed(2)}</span>
          <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;