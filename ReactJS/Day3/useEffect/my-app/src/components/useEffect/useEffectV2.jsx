// UseEffectV2Example.js
import React, { useState, useEffect } from 'react';

const UseEffectV2Example = () => {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: '', email: '' });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Effect 1: Runs only once on mount (equivalent to componentDidMount)
  useEffect(() => {
    console.log('🚀 useEffect V2 - Mount Effect: Component mounted');
    console.log('   - Equivalent to componentDidMount ONLY');
    console.log('   - Runs only once due to empty dependency array []');
    console.log('   - Perfect for: API calls, subscriptions, one-time setup');
    
    // Cleanup runs only on unmount
    return () => {
      console.log('💀 useEffect V2 - Mount Cleanup: Component unmounting');
      console.log('   - This cleanup runs only when component unmounts');
    };
  }, []); // Empty dependency array = runs once on mount

  // Effect 2: Runs when count changes (equivalent to componentDidUpdate for count)
  useEffect(() => {
    console.log('🔢 useEffect V2 - Count Effect: Count changed');
    console.log('   - Equivalent to componentDidUpdate but ONLY for count changes');
    console.log('   - New count value:', count);
    console.log('   - This effect ignores other state changes');
    
    // Side effect - update document title when count changes
    if (count > 0) {
      document.title = `Count: ${count}`;
    }
    
    return () => {
      console.log('🧹 useEffect V2 - Count Cleanup: Before count effect runs again');
      console.log('   - Runs before next count effect or component unmount');
    };
  }, [count]); // Dependency array with count = runs when count changes

  // Effect 3: Runs when user object changes
  useEffect(() => {
    console.log('👤 useEffect V2 - User Effect: User data changed');
    console.log('   - New user data:', user);
    console.log('   - Runs when user.name OR user.email changes');
    
    // Simulate API call to save user data
    if (user.name || user.email) {
      console.log('   - Simulating API call to save user data...');
      // In real app: saveUserData(user);
    }
    
    return () => {
      console.log('🧹 useEffect V2 - User Cleanup: Before user effect runs again');
    };
  }, [user]); // Runs when user object changes

  // Effect 4: Window resize listener (equivalent to adding/removing event listeners)
  useEffect(() => {
    console.log('📐 useEffect V2 - Window Resize Effect: Setting up resize listener');
    console.log('   - Adding event listener for window resize');
    console.log('   - Equivalent to componentDidMount for event listeners');
    
    const handleResize = () => {
      console.log('📏 Window resized:', window.innerWidth);
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup: Remove event listener
    return () => {
      console.log('🧹 useEffect V2 - Window Resize Cleanup: Removing resize listener');
      console.log('   - Equivalent to componentWillUnmount for event listeners');
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency = setup once, cleanup on unmount

  return (
    <div className="p-6 bg-purple-50 rounded-lg border border-purple-200 mb-6">
      <h2 className="text-2xl font-bold text-purple-800 mb-4">
        useEffect Hook V2 - Multiple Effects (With Dependencies)
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-purple-700 mb-1">
            Count: {count}
          </label>
          <button
            onClick={() => setCount(c => c + 1)}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Increment Count
          </button>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-purple-700 mb-1">
            Name:
          </label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
            className="px-3 py-2 border border-purple-300 rounded w-full mb-2 text-purple-800"
            placeholder="Enter your name"
          />
          <label className="block text-sm font-medium text-purple-700 mb-1">
            Email:
          </label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
            className="px-3 py-2 border border-purple-300 rounded w-full text-purple-800"
            placeholder="Enter your email"
          />
        </div>
        
        <div className="text-sm text-purple-600 bg-purple-100 p-3 rounded">
          <h3 className="font-bold mb-2">Current State:</h3>
          <p>• Window Width: {windowWidth}px (resize window to see effect)</p>
          <p>• Count: {count}</p>
          <p>• User: {JSON.stringify(user)}</p>
        </div>
        
      </div>
    </div>
  );
};

export default UseEffectV2Example;