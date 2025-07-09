import { type RouteConfig, index, layout, route} from "@react-router/dev/routes";

export default [
    layout("layouts/header.tsx", [
     index("routes/home.tsx"),
     route("about", "routes/about.tsx")
    ]),
    route("contact/123", "routes/contact.tsx")
] satisfies RouteConfig;
