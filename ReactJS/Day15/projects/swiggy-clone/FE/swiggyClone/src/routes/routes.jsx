
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Home from '../components/Home';
import NoAccess from '../components/NoAccess';
import NotFound from '../components/NotFound';
import Orders from '../components/Orders';
import RestaurantDetail from '../components/RestaurantDetail';
import Cart from '../components/Cart';
import Layout from '../layouts';
import { AdminRoute } from './routing';
import RouteWrapper from './routerWrapper';

const routes = [
  {
    path: '/',
    Component: () => <RouteWrapper Component={Layout} isProtected={true} />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'not-found',
        Component: NotFound,
      },
      // 👇 Catch-all 404 route (MUST be last among children)
      { 
        path: '*', 
        Component: NotFound 
      },
      {
        path: 'orders',
        Component: () => <RouteWrapper Component={Orders} isAdmin={true} />,
      },
      {
        path: 'no-access',
        Component: NoAccess,
      },
      {
        path: 'restaurant/:id',
        Component: RestaurantDetail,
      },
      {
        path: 'cart',
        Component: () => <RouteWrapper Component={Cart} isProtected={true} />,
      }
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
