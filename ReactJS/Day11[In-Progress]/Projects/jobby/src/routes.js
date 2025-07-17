import App from "./App";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import NotFound from "./components/NotFound";
import JobItemDetails from "./components/JobItemDetails"

const routes = [
  {
    path: '/',
    Component: App,
    children: [
      { 
        index: true, 
        Component: Home
      },
      { 
        path: 'jobs', 
        Component: Jobs
      },
      { 
        path: 'jobs/:id', 
        Component: JobItemDetails 
      },
      { 
        path: 'not-found', 
        Component: NotFound 
      },
      // 👇 Catch-all 404 route (MUST be last among children)
      { 
        path: '*', 
        Component: NotFound 
      },
    ],
  },
];

export default routes;