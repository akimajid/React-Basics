import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react"

const Navbar = () => {

  const userSelector = useSelector((state) => state.user)
  
  const dispatch = useDispatch()

  const logOutBtnHandler = () => {
    dispatch({
      type: "LOG_OUT",
    })  
    

    localStorage.removeItem("user_data")
  }

  return (
    <nav>
      <div className="link-wrapper">
        <Link to="/" style={{ textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/band">Band</Link>
        <Link to="/tour">Tour</Link>
        <Link to="/product">Product</Link>
        <Link to="/users">Users</Link>
        <Link to="/counter">Counter</Link>
        <a href="contact.html">Contact</a>
      </div>
      <Text margin={2} 
      justifyContent="center"
      cursor="pointer"
      _hover={{
        color: "blue.400",
      }}
      onClick={logOutBtnHandler}>
        Log Out
      </Text>
    </nav>
  );
};

export default Navbar;
