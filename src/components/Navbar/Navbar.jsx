import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {

  const userSelector = useSelector((state) => state.user)

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
        <Link to="/">{userSelector.username}</Link>
        <Link to="/counter">Counter</Link>
        <a href="contact.html">Contact</a>
      </div>
      <div className="search-wrapper">
        <i className="bi bi-search" />
      </div>
    </nav>
  );
};

export default Navbar;
