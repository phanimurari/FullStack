import { Link, Outlet } from "react-router"

const Header = () =>
<>
<img src="../../public/favicon.ico" alt="logo"/>
<h1>Header</h1>
<Link to="/contact">Contact</Link>
<Outlet/>
</>

export default Header