import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../redux/actions/productActions';
import ProductItem from './ProductItem';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  
  // Sample products data - in real app, this would come from an API
  React.useEffect(() => {
    const sampleProducts = [
      {
        id: 1,
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop"
      },
      {
        id: 2,
        name: "Smart Watch",
        description: "Feature-rich smartwatch with health tracking",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop"
      },
      {
        id: 3,
        name: "Laptop Stand",
        description: "Ergonomic laptop stand for better posture",
        price: 45.99,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop"
      },
      {
        id: 4,
        name: "Wireless Mouse",
        description: "Precision wireless mouse with long battery life",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=200&fit=crop"
      }
    ];
    
    dispatch(setProducts(sampleProducts));
  }, [dispatch]);
  
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;