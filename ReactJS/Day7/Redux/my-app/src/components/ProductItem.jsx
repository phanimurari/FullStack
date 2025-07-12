import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-xl font-bold text-green-600 mb-4">${product.price}</p>
      <button
        onClick={handleAddToCart}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;