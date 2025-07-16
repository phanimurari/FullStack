// import { use, Suspense } from 'react';

// // ✅ Memoize the fetch promise globally
// let productPromise;

// function fetchProduct() {
//   if (!productPromise) {
//     productPromise = fetch("https://fakestoreapi.com/products/1").then(res => {
//       if (!res.ok) {
//         throw new Error("Failed to fetch product");
//       }
//       return res.json();
//     });
//   }
//   return productPromise;
// }

// function Product() {
//   const product = use(fetchProduct()); // use() works with the cached promise
//   return <h1>{product.title}</h1>;
// }

// function App() {
//   return (
//     <Suspense fallback={<h1>Loading...</h1>}>
//       <Product />
//     </Suspense>
//   );
// }

// export default App;


// Suspense with Error Handling 

import { use, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

// ✅ Memoize the fetch promise globally
let productPromise;

function fetchProduct() {
  if (!productPromise) {
    productPromise = fetch("https://fakestoreapi.com/products/1").then(res => {
      if (!res.ok) {
        throw new Error("Failed to fetch product");
      }
      return res.json();
    });
  }
  return productPromise;
}

function Product() {
  const product = use(fetchProduct());
  return <h1>{product.title}</h1>;
}

// ✅ Fallback component for errors
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>❌ Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // 🔄 Optional: Reset cached promise if needed
        productPromise = null;
      }}
    >
      <Suspense fallback={<h1>Loading...</h1>}>
        <Product />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
