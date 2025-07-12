import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/actions/cartActions';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(updateQuantity(item.id, newQuantity));
    }
  };
  
  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };
  
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-16 h-16 object-cover rounded mr-4"
        />
        <div>
          <h4 className="font-semibold">{item.name}</h4>
          <p className="text-gray-600">${item.price}</p>
        </div>
      </div>
      
      <div className="flex items-center">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="bg-gray-300 text-gray-700 px-3 py-1 rounded-l hover:bg-gray-400"
        >
          -
        </button>
        <span className="bg-white px-4 py-1 border-t border-b">
          {item.quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="bg-gray-300 text-gray-700 px-3 py-1 rounded-r hover:bg-gray-400"
        >
          +
        </button>
        
        <button
          onClick={handleRemove}
          className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;