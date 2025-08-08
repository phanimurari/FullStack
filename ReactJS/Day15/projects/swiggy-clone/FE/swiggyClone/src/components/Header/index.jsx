import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import { HeaderContainer, Title, NavLinks, NavLink, LogoutButton, AvatarContainer, AvatarImage, AvatarInitials } from './styledComponents';
import { LuChefHat } from "react-icons/lu";
import { useEffect } from 'react';
import { fetchCart } from '../../redux/cart/cartActions';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const cartItemsCount = cart?.cart?.length || 0;

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);


  const getInitials = (name) => {
    if (!name) return '';
    const nameArray = name.split(' ');
    if (nameArray.length > 1) {
      return nameArray[0][0] + nameArray[1][0];
    }
    return name.substring(0, 2);
  };

  return (
    <HeaderContainer>
      <Title>
        <Link to="/">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LuChefHat size={40} style={{ marginRight: '10px' }} />
            <h1>Swiggy</h1>
          </div>
        </Link>
      </Title>
      <NavLinks>
        {isAuthenticated ? (
          <>
            <NavLink as={Link} to="/">Home</NavLink>
            <NavLink as={Link} to="/cart">Cart ({cartItemsCount})</NavLink>
            {user?.role === 'admin' && (
              <NavLink as={Link} to="/orders">
                Check Orders
              </NavLink>
            )}
            <AvatarContainer>
              {user.avatar ? (
                <AvatarImage src={user.avatar} alt={user.username} />
              ) : (
                <AvatarInitials>{getInitials(user.username)}</AvatarInitials>
              )}
            </AvatarContainer>
            <LogoutButton onClick={logout}>Logout</LogoutButton>
          </>
        ) : (
          <>
            <NavLink as={Link} to="/login">Login</NavLink>
            <NavLink as={Link} to="/register">Register</NavLink>
          </>
        )}
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header;
