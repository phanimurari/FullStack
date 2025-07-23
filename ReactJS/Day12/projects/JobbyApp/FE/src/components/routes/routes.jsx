import Home from "../Home"
import Jobs from "../Jobs"
import NotFound from "../NotFound"
import JobItemDetails from "../JobItemDetails"
import Login from "../Auth/Login"
import Register from "../Auth/Register"
import Layout from "../Layout"
import RouteWrapper from "./routerWrapper"

const routes = [
  {
    path: '/',
    Component: Layout,
    children: [
      { 
        index: true, 
        Component: () => <RouteWrapper Component={Home} isProtected={true} />
      },
      { 
        path: 'jobs', 
        Component: () => <RouteWrapper Component={Jobs} isProtected={true} />
      },
      { 
        path: 'jobs/:id', 
        Component: () => <RouteWrapper Component={JobItemDetails} isProtected={true} />
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
  {
    path: 'login',
    Component: () => <RouteWrapper Component={Login} isPublic={true} />,
  },
  {
    path: 'register',
    Component: () => <RouteWrapper Component={Register} isPublic={true} />,
  },
]

export default routes;
