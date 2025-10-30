import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';


const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleButtonClick = () => {
    setShowDropdown(!showDropdown);
  };
  const handleDropdownClick = () => {
    setShowDropdown(false);
  };

  return (
    <div className='Header'>
      <h1>Tasks List</h1>
      <div className='header-items'>
        <Link to="/">
      <button className="bttn">Home</button>
      </Link>
      <button className="bttn" onClick={handleButtonClick}>
        Filter
      </button>
      {showDropdown && (
        <ul className="dropdown">
          <li>
            <Link to="/completedtask" onClick={handleDropdownClick}>Completed</Link>
          </li>
          <li>
            <Link to="/incompletetask" onClick={handleDropdownClick}>Incompleted</Link>
          </li>
        </ul>
      )}
      </div>
    </div>
  );
};

export default Header;

