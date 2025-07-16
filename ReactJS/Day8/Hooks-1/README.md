# React 19 Advanced Hooks Complete Guide

## Hook: useState
1) **Definition**: A hook that lets you add state variables to functional components
2) **Real-time analogy**: Like a notepad where you can write something down, erase it, and write something new

**Purpose**: 
1) To manage local component state in functional components
2) Solves the problem of needing to store and update data that changes over time
3) We use it because functional components don't have built-in state like class components

**Example**: 
```jsx
// Basic Example
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Real-time Application Example - Shopping Cart
function ShoppingCart() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  
  const addItem = (item) => {
    setItems([...items, item]);
    setTotal(total + item.price);
  };
  
  return (
    <div>
      <h2>Cart Items: {items.length}</h2>
      <p>Total: ${total}</p>
      <button onClick={() => addItem({name: 'Coffee', price: 5})}>
        Add Coffee
      </button>
    </div>
  );
}
```

**Pitfalls**:
- State updates are asynchronous
- Directly mutating state won't trigger re-renders
- Using objects/arrays requires creating new references

---

## Hook: useEffect
1) **Definition**: A hook that lets you perform side effects in functional components
2) **Real-time analogy**: Like setting up automatic tasks that run when certain conditions are met (like a smart home system)

**Purpose**: 
1) To perform side effects like data fetching, subscriptions, or manually changing the DOM
2) Solves the problem of when and how to run code that affects things outside the component
3) We use it to replace lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount

**Example**: 
```jsx
// Basic Example
import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval); // Cleanup
  }, []); // Empty dependency array means run once
  
  return <div>Seconds: {seconds}</div>;
}

// Real-time Application Example - User Profile
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
  }, [userId]); // Runs when userId changes
  
  if (loading) return <div>Loading...</div>;
  return <div>Hello, {user?.name}!</div>;
}
```

**Pitfalls**:
- Missing dependencies in dependency array causes stale closures
- Infinite loops from missing or incorrect dependencies
- Forgetting cleanup functions can cause memory leaks

---

## Hook: useContext
1) **Definition**: A hook that lets you consume context values without wrapping components in Context.Consumer
2) **Real-time analogy**: Like having access to a company's shared resources (like WiFi password) without asking each department

**Purpose**: 
1) To consume context values and avoid prop drilling
2) Solves the problem of passing props through many component levels
3) We use it to access global or shared state across component trees

**Example**: 
```jsx
// Basic Example
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function Button() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button 
      style={{ 
        background: theme === 'dark' ? '#333' : '#fff',
        color: theme === 'dark' ? '#fff' : '#333'
      }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      Toggle Theme
    </button>
  );
}

// Real-time Application Example - Authentication
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  const login = async (credentials) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    const userData = await response.json();
    setUser(userData);
  };
  
  const logout = () => setUser(null);
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function ProfileMenu() {
  const { user, logout } = useContext(AuthContext);
  
  if (!user) return <div>Please log in</div>;
  
  return (
    <div>
      <span>Welcome, {user.name}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

**Pitfalls**:
- Using context for frequently changing values can cause performance issues
- Context value changes cause all consumers to re-render
- Must be used within a Provider component

---

## Hook: useReducer
1) **Definition**: A hook that lets you manage complex state logic through a reducer function
2) **Real-time analogy**: Like a vending machine that accepts different commands (coins, button presses) and changes state accordingly

**Purpose**: 
1) To manage complex state logic with multiple sub-values or state transitions
2) Solves the problem of useState becoming unwieldy with complex state updates
3) We use it when state logic is complex or when next state depends on previous state

**Example**: 
```jsx
// Basic Example
import { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}

// Real-time Application Example - Shopping Cart
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

function ShoppingCart() {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });
  
  const addItem = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };
  
  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };
  
  return (
    <div>
      <h2>Shopping Cart ({cart.items.length})</h2>
      {cart.items.map(item => (
        <div key={item.id}>
          {item.name} - Quantity: {item.quantity}
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <button onClick={() => addItem({ id: 1, name: 'Coffee', price: 5 })}>
        Add Coffee
      </button>
    </div>
  );
}
```

**Pitfalls**:
- Reducer functions must be pure (no side effects)
- Complex reducers can become hard to debug
- Overusing useReducer for simple state

---

## Hook: useCallback
1) **Definition**: A hook that returns a memoized callback function
2) **Real-time analogy**: Like saving a recipe card so you don't have to rewrite it every time you cook

**Purpose**: 
1) To memoize functions to prevent unnecessary re-renders of child components
2) Solves the problem of functions being recreated on every render
3) We use it to optimize performance when passing callbacks to child components

**Example**: 
```jsx
// Basic Example
import { useState, useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  // Without useCallback, this function is recreated on every render
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  }, []); // Empty dependency array means function never changes
  
  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Type something..."
      />
      <ExpensiveChildComponent onButtonClick={handleClick} />
      <p>Count: {count}</p>
    </div>
  );
}

// Real-time Application Example - Search with Debounce
function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  const debouncedSearch = useCallback(
    debounce(async (searchTerm) => {
      if (searchTerm) {
        const response = await fetch(`/api/search?q=${searchTerm}`);
        const data = await response.json();
        setResults(data);
      } else {
        setResults([]);
      }
    }, 300),
    []
  );
  
  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  }, [debouncedSearch]);
  
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <SearchResults results={results} />
    </div>
  );
}

function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
}
```

**Pitfalls**:
- Overusing useCallback can actually hurt performance
- Missing dependencies in dependency array
- Using it when the child component isn't memoized (React.memo)

---

## Hook: useMemo
1) **Definition**: A hook that returns a memoized value
2) **Real-time analogy**: Like keeping a calculator result saved so you don't have to recalculate it unless the numbers change

**Purpose**: 
1) To memoize expensive calculations and prevent unnecessary recalculations
2) Solves the problem of expensive operations running on every render
3) We use it to optimize performance for computationally expensive operations

**Example**: 
```jsx
// Basic Example
import { useState, useMemo } from 'react';

function ExpensiveCalculationComponent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  
  // Expensive calculation that only runs when items change
  const expensiveValue = useMemo(() => {
    console.log('Calculating expensive value...');
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <p>Expensive calculation result: {expensiveValue}</p>
      <button onClick={() => setItems([...items, { value: Math.random() }])}>
        Add Item
      </button>
    </div>
  );
}

// Real-time Application Example - Data Processing
function DataDashboard({ rawData }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  
  const processedData = useMemo(() => {
    console.log('Processing data...');
    
    let filtered = rawData;
    if (filter !== 'all') {
      filtered = rawData.filter(item => item.category === filter);
    }
    
    const sorted = filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'date') return new Date(a.date) - new Date(b.date);
      return 0;
    });
    
    return sorted;
  }, [rawData, filter, sortBy]);
  
  const statistics = useMemo(() => {
    return {
      total: processedData.length,
      average: processedData.reduce((sum, item) => sum + item.value, 0) / processedData.length,
      max: Math.max(...processedData.map(item => item.value))
    };
  }, [processedData]);
  
  return (
    <div>
      <div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="sales">Sales</option>
          <option value="marketing">Marketing</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="date">Sort by Date</option>
        </select>
      </div>
      
      <div>
        <h3>Statistics</h3>
        <p>Total: {statistics.total}</p>
        <p>Average: {statistics.average.toFixed(2)}</p>
        <p>Max: {statistics.max}</p>
      </div>
      
      <div>
        {processedData.map(item => (
          <div key={item.id}>{item.name} - {item.value}</div>
        ))}
      </div>
    </div>
  );
}
```

**Pitfalls**:
- Overusing useMemo can actually hurt performance
- Missing dependencies in dependency array
- Using it for cheap calculations

---

## Hook: useRef
1) **Definition**: A hook that returns a mutable ref object that persists for the full lifetime of the component
2) **Real-time analogy**: Like a sticky note that stays on your desk and doesn't get erased when you clean your workspace

**Purpose**: 
1) To access DOM elements directly or store mutable values that don't cause re-renders
2) Solves the problem of accessing DOM elements or storing values that persist across renders
3) We use it when we need to interact with DOM elements or store mutable values

**Example**: 
```jsx
// Basic Example
import { useRef, useEffect } from 'react';

function FocusInput() {
  const inputRef = useRef(null);
  
  useEffect(() => {
    // Focus the input when component mounts
    inputRef.current.focus();
  }, []);
  
  const handleClick = () => {
    inputRef.current.focus();
  };
  
  return (
    <div>
      <input ref={inputRef} type="text" placeholder="I will be focused!" />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}

// Real-time Application Example - Video Player
function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleSeek = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };
  
  return (
    <div>
      <video
        ref={videoRef}
        src={src}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div>
        <button onClick={togglePlay}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={() => handleSeek(0)}>Restart</button>
        <button onClick={() => handleSeek(videoRef.current?.currentTime + 10)}>
          Skip 10s
        </button>
      </div>
    </div>
  );
}

// Storing mutable values example
function Timer() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);
  
  const startTimer = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
  };
  
  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  
  return (
    <div>
      <p>Time: {time}s</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}
```

**Pitfalls**:
- Changing ref.current doesn't trigger re-renders
- Don't read or write refs during rendering
- Refs are null initially

---


## Hook: useId


1) **Definition**: A hook that generates unique IDs that are stable across server and client
2) **Real-time analogy**: Like getting a unique serial number for each product in a factory

**Purpose**: 
1) To generate unique IDs for accessibility attributes and form elements
2) Solves the problem of ID collisions and hydration mismatches
3) We use it to create stable, unique identifiers for HTML elements

**Example**: 
```jsx
// Basic Example
import { useId } from 'react';

function FormField({ label, type = 'text' }) {
  const id = useId();
  
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} />
    </div>
  );
}

function LoginForm() {
  return (
    <form>
      <FormField label="Username" />
      <FormField label="Password" type="password" />
      <FormField label="Email" type="email" />
    </form>
  );
}

// Real-time Application Example - Complex Form
function MultiStepForm() {
  const formId = useId();
  const [step, setStep] = useState(1);
  
  return (
    <div>
      <h2>Multi-Step Form</h2>
      <div role="tablist">
        <button
          role="tab"
          id={`${formId}-tab-1`}
          aria-controls={`${formId}-panel-1`}
          aria-selected={step === 1}
          onClick={() => setStep(1)}
        >
          Personal Info
        </button>
        <button
          role="tab"
          id={`${formId}-tab-2`}
          aria-controls={`${formId}-panel-2`}
          aria-selected={step === 2}
          onClick={() => setStep(2)}
        >
          Address
        </button>
      </div>
      
      <div
        role="tabpanel"
        id={`${formId}-panel-1`}
        aria-labelledby={`${formId}-tab-1`}
        hidden={step !== 1}
      >
        <PersonalInfoStep />
      </div>
      
      <div
        role="tabpanel"
        id={`${formId}-panel-2`}
        aria-labelledby={`${formId}-tab-2`}
        hidden={step !== 2}
      >
        <AddressStep />
      </div>
    </div>
  );
}

function PersonalInfoStep() {
  const nameId = useId();
  const emailId = useId();
  
  return (
    <fieldset>
      <legend>Personal Information</legend>
      <div>
        <label htmlFor={nameId}>Full Name:</label>
        <input id={nameId} type="text" required />
      </div>
      <div>
        <label htmlFor={emailId}>Email:</label>
        <input id={emailId} type="email" required />
      </div>
    </fieldset>
  );
}

function AddressStep() {
  const addressId = useId();
  const cityId = useId();
  
  return (
    <fieldset>
      <legend>Address Information</legend>
      <div>
        <label htmlFor={addressId}>Street Address:</label>
        <input id={addressId} type="text" required />
      </div>
      <div>
        <label htmlFor={cityId}>City:</label>
        <input id={cityId} type="text" required />
      </div>
    </fieldset>
  );
}
```

**Pitfalls**:
- Don't use for keys in lists
- Generated IDs contain special characters
- Not suitable for CSS selectors


---

## 🔹 **Hook: `use()`** (New in React 19)

### ✅ 1) **Definition:**

`use()` is a new hook in React 19 that lets you **unwrap (await)** promises **directly inside your component**, especially useful with **Server Components** or **suspending data**.

---

### ✅ 2) **Real-time Analogy:**

Imagine you’ve ordered food. Instead of waiting in line, you’re allowed to pause your current activity (suspend), get notified when the food is ready, and then continue.
`use()` is like asking React: “Hey, pause the component until this promise (data) is ready, and then continue rendering.”

---

## 📌 Purpose:

1. Allows **awaiting promises directly inside component code**, without needing `useEffect` or complex state logic.
2. Useful in **Server Components**, where asynchronous code is common.
3. Makes **data fetching feel synchronous** and cleaner.

---

## 💡 Example:

### ✅ **Simple Example:**

```jsx
// async function that returns a promise
async function fetchUser() {
  const res = await fetch('/api/user');
  return res.json();
}

// In a Server Component
export default function UserComponent() {
  const user = use(fetchUser()); // Automatically suspends until data is ready

  return <p>Hello, {user.name}!</p>;
}
```

### ✅ Real-Time Application Example:

Imagine you’re building a blog where you fetch the post data from the server:

```jsx
async function getPost(postId) {
  const res = await fetch(`/api/posts/${postId}`);
  return res.json();
}

export default function PostPage({ postId }) {
  const post = use(getPost(postId)); // Suspends until data is fetched

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

---

## ⚠️ Pitfalls:

* `use()` **only works in Server Components** (not in client components).
* Must be used at **top level** of a component (can’t be inside `if` blocks or loops).
* Requires **React 19** and **a supported setup (like Next.js App Router)**.
* If you use it in a Client Component, it will throw an error.

---

### ✅ Summary:

* **What it does:** Suspends until a promise resolves (like `await`, but inside the component).
* **Where to use it:** Server Components in React 19.
* **Why it's awesome:** Makes async data fetching cleaner and more declarative.

