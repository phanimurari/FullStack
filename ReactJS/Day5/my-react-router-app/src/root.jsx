import { Outlet, ScrollRestoration, Scripts } from "react-router";

export default function Root() {
  return <Outlet />;
}

export function Layout({ children }) {
  return (
    <html lang="en">
      <head><title>Contacts</title></head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
