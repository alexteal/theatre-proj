import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MailLockIcon from "@mui/icons-material/MailLock";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { signOutUser } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    signOutUser();
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Cinema E-Booking</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">DASHBOARD</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Movies</span>
            </li>
          </Link>
          {currentUser && currentUser.isAdmin ? (
            <>
              <Link to="/manage-promo" style={{ textDecoration: "none" }}>
                <li>
                  <MailLockIcon className="icon" />
                  <span>Manage Promos</span>
                </li>
              </Link>
              <Link to="/manage-movies" style={{ textDecoration: "none" }}>
                <li>
                  <AdminPanelSettingsIcon className="icon" />
                  <span>Manage Movies</span>
                </li>
              </Link>
            </>
          ) : null}

          <p className="title">USER</p>

          <Link to="/edit-profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
