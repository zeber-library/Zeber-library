import React,{useState} from "react";
import { Link } from "react-router-dom";

const Header = ({
  toggleSidebar, //to toggle the sidebar
  toggleDarkMode, // to toggle the darkmode
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <header>
      <nav className="navBar">
        {/* SideBar Toggle span */}
        <div className="toggle">
          <span onClick={toggleSidebar}>
            <i className="fa fa-bars"></i>
          </span>
        </div>
        {/* Company Logo */}
        <div className="logo">
          <Link to="/">
            <img src="/library/image/logo.jpeg" alt="Zeber's Logo" />
          </Link>
        </div>
        {/* SearchBar */}
        <div className="searchBar">
          <span>
            <i className="fa fa-filter"></i>
          </span>
          <input
            type="text"
            placeholder="Search for books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span>
          <Link to='/book-search' state={{searchTerm}}>
          <i className="fa fa-magnifying-glass"></i></Link>
          </span>
        </div>
        {/* Rest Icons */}
        <div className="icons">
          <Link to="/upload-book">
            <div className="upload">
              <span>
                <i className="fa fa-upload"></i>
              </span>
              <span className="text">Upload your book</span>
            </div>
          </Link>

          <div className="subIcons">
            {/**toggle darkmode */}
            <span>
              <i
                className="fa-solid fa-sun"
                id="darkLight"
                onClick={toggleDarkMode}
              ></i>
            </span>
            <span>
              <i className="fa fa-bell"></i>
            </span>
            <span>
              <i className="fa fa-user"></i>
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
