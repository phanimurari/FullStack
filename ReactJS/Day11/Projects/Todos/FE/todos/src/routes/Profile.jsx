import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom';


function Profile() {

  const navigate = useNavigate();


  const onClickLogout = () => {
    console.log("Logout functionality")
    Cookies.remove('jwt_token')
     navigate('/login');
  }

  return (
    <>
    <h1>Profile</h1>
    <button onClick={onClickLogout}>Logout</button>
    </>
  );
}

export default Profile;