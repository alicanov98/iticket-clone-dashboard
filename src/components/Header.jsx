// Router
import { Link, NavLink } from "react-router-dom";

// Images
import logo from "../assets/images/logo.svg";

// Icons
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Context } from "../utils/MainContext";
import { useContext } from "react";

const Header = () => {

  const {userIn,setUserIn,setUser}=useContext(Context)

  const logOut = () =>{
    localStorage.removeItem("token")
    setUser({})
    setUserIn(false)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
    {userIn &&           <nav className="navBar">
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
          </nav>}
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
