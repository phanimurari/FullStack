import React from 'react';
import App from './App';
import HomePage from './routes/HomePage';
import AboutPage from './routes/AboutPage';
import ContactPage from './routes/ContactPage';
import NotFound from './routes/NotFound';

const routes = [
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: HomePage },
      { path: 'about', Component: AboutPage },
      // 👇 Catch-all 404 route (MUST be last among children)
      { path: '*', Component: NotFound },
    ],
  },
  {
    path: 'contact/:id',
    Component: ContactPage,
  },
  {
    path: '*', // outside layout
    Component: NotFound,
  }
];

export default routes;


// ✅ Option 2: Create a Separate MainLayout Component (if App ≠ layout)
// If App.jsx is your root logic (e.g., Auth, Theme, Contexts), 
// and you want a separate layout UI (e.g., sidebar, navbar), do this:

// import App from './App'; // root app, no UI
// import MainLayout from './layouts/MainLayout';
// import HomePage from './routes/HomePage';
// import AboutPage from './routes/AboutPage';
// import ContactPage from './routes/ContactPage';

// const routes = [
//   {
//     path: '/',
//     Component: App, // Root App (could wrap Theme/Auth providers)
//     children: [
//       {
//         Component: MainLayout, // layout UI
//         children: [
//           { index: true, Component: HomePage },
//           { path: 'about', Component: AboutPage },
//         ],
//       },
//       {
//         path: 'contact/:id',
//         Component: ContactPage,
//       },
//     ],
//   },
// ];

// export default routes;


// Understanding Loader and Action

// import App from './App.jsx';
// import Home, { loader as usersLoader } from './routes/Home.jsx';
// import Contact, { action as contactAction } from './routes/Contact.jsx';

// const routes = [
//   {
//     path: '/',
//     Component: App,
//     children: [
//       {
//         index: true,
//         Component: Home,
//         loader: usersLoader,
//       },
//       {
//         path: 'contact',
//         Component: Contact,
//         action: contactAction,
//       },
//     ],
//   },
// ];

// export default routes;
