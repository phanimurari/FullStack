import Trending from "../pages/Trending";
import Movies from "../pages/Movies";
import TV from "../pages/Tv";
import Search from "../pages/Search";
import Error from "../pages/Error";
import Layout from "../Components/Layout";

const routes = [
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Trending,
      },
      {
        path: "movies",
        Component: Movies,
      },
      {
        path: "tv",
        Component: TV,
      },
      {
        path: "search",
        Component: Search,
      },
      {
        path: "*",
        Component: Error,
      },
    ],
  },
];

export default routes;
