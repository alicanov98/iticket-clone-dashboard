import { useContext } from "react";

//? Router
import { Link, NavLink } from "react-router-dom";

//? Images
import logo from "../assets/images/logo.svg";

//? React Icons
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

//? Context
import { Context } from "../utils/MainContext";

const Header = () => {
  //? Context
  const { userIn, setUserIn, setUser } = useContext(Context);

  //? Logout
  const logOut = () => {
    localStorage.removeItem("token");
    setUser({});
    setUserIn(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          {userIn && (
            <nav className="navBar">
              <ul className="navList">
                <li className="navItem">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className="navItem">
                  <NavLink to="/all-tickets">All Tickets</NavLink>
                </li>
                <li className="navItem">
                  <NavLink to="/create-ticket">Add new ticket</NavLink>
                </li>
              </ul>
            </nav>
          )}
          <div className="userArea">
            {userIn && <Link to="/profile">My Profile</Link>}
            {userIn ? (
              <button className="logOut" onClick={logOut}>
                LOG OUT
                <FaSignOutAlt />
              </button>
            ) : (
              <Link className="login" to="/login">
                <FaUserCircle />
                <span>LOG IN</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
