import "./navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <Link to="/" className="item">
            Movies
          </Link>{" "}
          <Link to="/edit-profile" className="item">
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
