import React, { useState, useCallback, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Search from '../components/search/Search';
import CloseIcon from '@mui/icons-material/Close';
import useApi from "../hooks/useApi";

export function Nav() {
  const [showMenu, setShowMenu] = useState(false);
  const { data: categories, loaded } = useApi("http://localhost:3001/categories");

  const closeOpenMenus = useCallback((e) => {
    if (showMenu && !e.target.closest(".topnav")) {
      setShowMenu(false);
    }
  }, [showMenu]);

  useEffect(() => {
    document.addEventListener("mousedown", closeOpenMenus);
    return () => {
      document.removeEventListener("mousedown", closeOpenMenus);
    };
  }, [closeOpenMenus]);

  return (
    <nav className="navWrapper">
      <div className={`topnav ${showMenu && "menuOpened"}`} id="myTopnav">
      <Link to="/admin" onClick={() => setShowMenu(!showMenu)}>Admin</Link>
        <Link to="/" onClick={() => setShowMenu(!showMenu)}>Startsida</Link>
        {loaded && categories.map((category, index) => (
          <Link key={index} to={`/categories/${category.name}`} onClick={() => setShowMenu(!showMenu)}>
            {category.name}
          </Link>
        ))}
        <div style={{backgroundColor: "white"}} className="icon" onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? <CloseIcon className='closeIcon'/> : <MenuIcon className='menuIcon'/>}
        </div>
      </div>
      <div>
        <Search />
      </div>
    </nav>
  );
}
