Act as the React developer and understand the `AuthContext.jsx ` and `App.jsx ` file.

Modify the Protected Routing logic based on the below example.

```
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = (props) => {
  const token = Cookies.get("jwt_token");
  if (token === undefined) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;
```

