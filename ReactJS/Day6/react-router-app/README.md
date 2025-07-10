# 📘 React Router v7 Application – README.md

This project is a simple React application that demonstrates the use of **React Router v7.6**, including support for **nested routes**, **layouts**, **data loading via `loader`**, **form submission via `action`**, and configuration using both **object-based routes** and **JSX-based routes**.

---

## 🚀 Technologies Used

* React
* React Router DOM v7.6+
* Public REST API (`jsonplaceholder.typicode.com`)

---

## 📂 Project Structure

```
src/
├── App.jsx                  // Root component acting as layout
├── main.jsx                // Application entry point
├── routes/
│   ├── Home.jsx            // Uses loader() to fetch users
│   └── Contact.jsx         // Uses action() to handle form submission
├── routes.js               // Object-based route configuration
├── layouts/MainLayout.jsx // (Optional) Shared layout component
```

---

## 🔄 Routing Concepts Used

### 1. `createBrowserRouter`

**Definition:**
Creates a browser-based router using the HTML5 history API. It accepts an array of route objects or JSX elements (via `createRoutesFromElements()`).

**Usage:**

```js
const router = createBrowserRouter(routes);
```

---

### 2. `RouterProvider`

**Definition:**
Wraps your application and connects it to the router. It enables route matching, navigation, data loading, and rendering.

**Usage:**

```js
<RouterProvider router={router} />
```

---

### 3. `loader()`

**Definition:**
A function attached to a route that **fetches data before rendering** the route’s component. The data is then accessed using `useLoaderData()` inside the component.

**Example Use Case:**
In `Home.jsx`, we fetch a list of users before rendering the home page.

```js
export async function loader() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  return res.json();
}
```

---

### 4. `useLoaderData()`

**Definition:**
A hook used inside the route component to access data returned by the route's `loader()`.

**Usage:**

```js
const users = useLoaderData();
```

---

### 5. `action()`

**Definition:**
A function attached to a route that handles **form submissions** or data mutations (e.g., POST/PUT/DELETE requests). Called automatically when a form is submitted.

**Example Use Case:**
In `Contact.jsx`, we submit a name via POST request and show a confirmation.

```js
export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get('name');
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({ title: name }),
    headers: { 'Content-Type': 'application/json' },
  });
  return { success: true, response: await res.json() };
}
```

---

### 6. `useActionData()`

**Definition:**
A hook to access the return value from the route’s `action()` function after a form submission.

**Usage:**

```js
const data = useActionData();
```

---

### 7. `createRoutesFromElements()`

**Definition:**
Converts a JSX `<Route>` tree into a route object config that can be used with `createBrowserRouter()`.

**Usage:**

```js
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="contact" element={<Contact />} />
    </Route>
  )
);
```

---

### 8. `createHashRouter()` (Optional)

**Definition:**
Creates a router that uses `window.location.hash` for routing (e.g., `/#/about`), useful for static file hosting platforms like GitHub Pages that don’t support server-side routing.

**Usage:**

```js
const router = createHashRouter(routes);
```

---

## 🧩 Application Features

* ✅ Fetches user data on page load using `loader`
* ✅ Displays users using `useLoaderData`
* ✅ Handles form submission via `action`
* ✅ Displays success message using `useActionData`
* ✅ Uses nested routes and shared layout (`App` with `<Outlet />`)
* ✅ Can switch between `createBrowserRouter` and `createHashRouter` depending on deployment

---

## 📸 Screenshot

```
[Insert a screenshot showing homepage and form submission if desired]
```

---

## 📚 Learning Goals

This project helps you understand how to:

* Set up declarative routing with React Router v7+
* Use data loading patterns with `loader`
* Handle forms and mutations with `action`
* Structure layouts and nested routes cleanly
* Build fully interactive data-driven pages with minimal `useEffect` or local state

