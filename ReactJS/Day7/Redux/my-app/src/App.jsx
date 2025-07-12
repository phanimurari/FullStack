import ProductList from './components/ProductList';
import Cart from './components/Cart';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Redux Shopping Cart Demo
        </h1>
        
        <ProductList />
        <Cart />
        
        {/* Redux DevTools Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Redux DevTools</h3>
          <p className="text-blue-700">
            Open browser DevTools and look for the Redux tab to see actions and state changes in real-time!
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;