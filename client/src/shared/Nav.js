import React, { useState, useCallback, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { Search } from '../components/search/Search';
import CloseIcon from '@mui/icons-material/Close';

export function Nav() {
  // State för att hålla reda på om menyn ska visas eller inte
  const [showMenu, setShowMenu] = useState(false);

  /// Callback-funktion för att stänga menyn genom att klicka utanför den
  const closeOpenMenus = useCallback((e) => {
    if (showMenu && !e.target.closest(".topnav")) {
      setShowMenu(false);
    }
  }, [showMenu]);

  // Lyssna på klick utanför menyn och stäng menyn om det behövs
  useEffect(() => {
    document.addEventListener("mousedown", closeOpenMenus);
    return () => {
      document.removeEventListener("mousedown", closeOpenMenus);
    };
  }, [closeOpenMenus]);

  return (
    <nav className="navWrapper">
      <div className={`topnav ${showMenu && "menuOpened"}`} id="myTopnav">
        <Link to="/" onClick={() => setShowMenu(!showMenu)}>Startsida</Link>
        <Link to="/category/Telefoner" onClick={() => setShowMenu(!showMenu)}>Telefoner</Link>
        <Link to="/category/Tröjor" onClick={() => setShowMenu(!showMenu)}>Tröjor</Link>
        
        {/* Knapp för att visa/dölja menyn */}
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