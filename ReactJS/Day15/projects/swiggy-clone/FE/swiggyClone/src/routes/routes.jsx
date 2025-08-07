
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Home from '../components/Home';
import NotFound from '../components/NotFound';
import PostDetails from '../components/PostDetails';
import Publish from '../components/Publish';
import Search from '../components/Search';
import Layout from '../layouts';
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
        path: 'post/:slug',
        Component: PostDetails,
      },
      {
        path: 'search',
        Component: Search,
      },
      {
        path: 'publish',
        Component: Publish,
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
