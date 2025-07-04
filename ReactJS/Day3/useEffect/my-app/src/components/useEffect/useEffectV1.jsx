// UseEffectV1Example.js
import React, { useState, useEffect } from 'react';

const UseEffectV1Example = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // Single useEffect - equivalent to componentDidMount + componentDidUpdate + componentWillUnmount
  useEffect(() => {
    console.log('🎯 useEffect V1: This runs after every render');
    console.log('   - Equivalent to componentDidMount + componentDidUpdate');
    console.log('   - Current count:', count);
    console.log('   - Current name:', name);
    console.log('   - No dependency array means it runs after EVERY render');
    
    // Side effect example - update document title
    document.title = `Count: ${count}, Name: ${name}`;
    
    // Cleanup function - equivalent to componentWillUnmount
    return () => {
      console.log('🧹 useEffect V1 Cleanup: This runs before next effect or unmount');
      console.log('   - Equivalent to componentWillUnmount');
      console.log('   - Cleanup runs before EVERY new effect execution');
    };
  }); // No dependency array means it runs after every render


  const incrementCount  = () => {
    //any other logic
    setCount(c => c + 1)
  }

  return (
    <div className="p-6 bg-green-50 rounded-lg border border-green-200 mb-6">
      <h2 className="text-2xl font-bold text-green-800 mb-4">
        useEffect Hook V1 - Single Effect (No Dependencies)
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-green-700 mb-1">
            Count: {count}
          </label>
          <button
            onClick={incrementCount}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Increment Count
          </button>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-green-700 mb-1">
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 border border-green-300 rounded w-full text-purple-800"
            placeholder="Enter your name"
          />
        </div>
        
        <div className="text-sm text-green-600 bg-green-100 p-3 rounded">
          <h3 className="font-bold mb-2">useEffect V1 Behavior:</h3>
          <ul className="space-y-1">
            <li>• <strong>No dependency array []</strong> - runs after every render</li>
            <li>• <strong>Equivalent to:</strong> componentDidMount + componentDidUpdate</li>
            <li>• <strong>Cleanup function</strong> runs before next effect or unmount</li>
            <li>• <strong>Use case:</strong> Effects that need to run on every update</li>
            <li>• <strong>Performance:</strong> Can be expensive, use carefully</li>
          </ul>
        </div>
        
      </div>
    </div>
  );
};

export default UseEffectV1Example;