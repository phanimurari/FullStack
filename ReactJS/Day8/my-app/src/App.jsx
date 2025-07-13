// 1. useCallback Hook


// import { useState, useRef, useEffect } from 'react';

// function ExpensiveChildComponent(props) {
//   const { onButtonClick } = props;
//   console.log('%c[Child] Rendered', 'color: orange');
//   return <button onClick={onButtonClick}>Click</button>;
// }

// function App() {
//   const [count, setCount] = useState(0);
//   const [name, setName] = useState('');

//   const handleClick = () => {
//     setCount((prev) => prev + 1);
//   }// ✅ Memoized — same reference every render

//   const prevRef = useRef();

//   useEffect(() => {
//     if (prevRef.current === handleClick) {
//       console.log('%c[handleClick] is the SAME reference', 'color: green');
//     } else if (prevRef.current) {
//       console.log('%c[handleClick] is a NEW reference', 'color: red');
//     }
//     prevRef.current = handleClick;
//   });

//   return (
//     <div>
//       <input
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Type something..."
//       />
//       <ExpensiveChildComponent onButtonClick={handleClick} />
//       <p>Count: {count}</p>
//     </div>
//   );
// }

// export default App;



// import { useState, useMemo } from 'react';

// function App() {
//   const [count, setCount] = useState(0);
//   const [items, setItems] = useState([]);
  
//   // Expensive calculation that only runs when items change
//   const expensiveValue = useMemo(() => {
//     console.log('Calculating expensive value...');
//     return items.reduce((sum, item) => sum + item.value, 0);
//   }, [items]);
  
//   return (
//     <div>
//       <button onClick={() => setCount(count + 1)}>
//         Count: {count}
//       </button>
//       <p>Expensive calculation result: {expensiveValue}</p>
//       <button onClick={() => 
//         {
//           console.log("Clicked") 
//           setItems([...items, { value: Math.random() }])}
//         }>
//         Add Item
//       </button>
//     </div>
//   );
// }


// export default App













// 2. useRef Hook

  import { useRef, useEffect} from 'react';


  const ChildComponent = (props) => {
    const {handleClick} = props
    return <button onClick={handleClick}>Focus Input</button>
  }



  function App() {
    const inputRef = useRef(null);
    const inputRef2 = useRef(null)

    const [data, setData] = useState([])
    const [isLoading, setIsloading] = useState(true)
    const [isError, setIsError] = useState(false)

    

    useEffect( () => {
      // write the logic to fetch the data
      setIsloading(false)

    }, [])
    
    useEffect(() => {
      // Focus the input when component mounts
      inputRef.current.focus();
    }, []);
    
    const handleClick = () => {
      console.log("Clicked")
      inputRef2.current.focus();
    };
    
    return (
      <div>
        <input ref={inputRef} type="text" placeholder="I will be focused!" />
        <input ref={inputRef2}  type="text" placeholder="Second input will be focused!" />
        <ChildComponent ref={inputRef2} handleClick={handleClick}/>
      </div>
    );
  }

  export default App