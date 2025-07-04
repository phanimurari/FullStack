import { useState } from 'react';
import { Plus, Minus, RotateCcw, Target } from 'lucide-react';

const CounterApp = () => {
  // useState Hook - This is where the magic happens!
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  // Event handlers
  const increment = () => {
    setCount(count + step);
  };

  const decrement = () => {
    setCount(count - step);
  };

  const reset = () => {
    setCount(0);
  };

  const setGoal = (goal) => {
    setCount(goal);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🔢 Interactive Counter
          </h1>
          <p className="text-lg text-gray-600">
            Mastering React State with useState Hook
          </p>
        </div>

        {/* Concept Explanation */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-l-4 border-purple-500">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            🎯 Learning Objective: useState Hook
          </h2>
          <div className="text-gray-700 space-y-2">
            <p><strong>What is State?</strong> State is data that can change over time in your component.</p>
            <p><strong>useState Hook:</strong> A React Hook that lets you add state to functional components.</p>
            <p><strong>Syntax:</strong> <code className="bg-gray-200 px-2 py-1 rounded">const [state, setState] = useState(initialValue)</code></p>
          </div>
        </div>

        {/* Code Example Display */}
        <div className="bg-gray-900 text-green-400 p-6 rounded-lg mb-8 overflow-x-auto">
          <h3 className="text-white font-semibold mb-3">💻 Code Example:</h3>
          <pre className="text-sm">
{`// Import useState from React
import { useState } from 'react';

// Declare state variable
const [count, setCount] = useState(0);  // Initial value: 0
const [step, setStep] = useState(1);    // Initial value: 1

// Update state
const increment = () => {
  setCount(count + step);  // Updates count state
};

// React will re-render when state changes!`}
          </pre>
        </div>

        {/* Main Counter Display */}
        <div className="bg-white p-12 rounded-2xl shadow-2xl mb-8 text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">Current Count</h2>
            <div className="text-8xl font-bold text-purple-600 mb-4">{count}</div>
            <div className="text-lg text-gray-600">
              Step Size: <span className="font-semibold text-purple-600">{step}</span>
            </div>
          </div>

          {/* Step Size Controls */}
          <div className="mb-8">
            <label className="block text-gray-700 font-semibold mb-2">
              Adjust Step Size:
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={step}
              onChange={(e) => setStep(parseInt(e.target.value))}
              className="w-64 h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-purple-600 font-semibold mt-2">
              {step} {step === 1 ? 'unit' : 'units'} per click
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={decrement}
              className="flex items-center px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
            >
              <Minus className="w-5 h-5 mr-2" />
              Decrease
            </button>
            
            <button
              onClick={reset}
              className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors shadow-lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </button>
            
            <button
              onClick={increment}
              className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Increase
            </button>
          </div>

          {/* Quick Goal Buttons */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              <Target className="inline w-5 h-5 mr-2" />
              Quick Goals
            </h3>
            <div className="flex justify-center space-x-3">
              {[10, 25, 50, 100].map((goal) => (
                <button
                  key={goal}
                  onClick={() => setGoal(goal)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* State Analysis */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">🔍 State Analysis:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Count State</h4>
              <p className="text-gray-700">
                <strong>Value:</strong> {count}<br />
                <strong>Type:</strong> {typeof count}<br />
                <strong>Positive:</strong> {count > 0 ? 'Yes' : 'No'}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Step State</h4>
              <p className="text-gray-700">
                <strong>Value:</strong> {step}<br />
                <strong>Type:</strong> {typeof step}<br />
                <strong>Range:</strong> 1-10
              </p>
            </div>
          </div>
        </div>

        {/* Footer with Key Takeaways */}
        <div className="bg-purple-900 text-white p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">🔑 Key Takeaways:</h3>
          <ul className="space-y-2">
            <li>• <code className="bg-purple-800 px-2 py-1 rounded">useState</code> returns an array with current state and setter function</li>
            <li>• State updates trigger component re-renders</li>
            <li>• Always use the setter function to update state (never mutate directly)</li>
            <li>• State is local to each component instance</li>
            <li>• Initial state is only used on the first render</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CounterApp;