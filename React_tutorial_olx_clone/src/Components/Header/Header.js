import React, { useContext, useState } from 'react';
import { AuthContext, FirebaseContext } from '../../store/Context';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useHistory } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';



function Header() {

    const history = useHistory()
    const {user} = useContext(AuthContext)
    const {firebase} = useContext(FirebaseContext)
    const auth = getAuth();
    

    const handleLogout = () =>{
      signOut(auth)
      history.push('/login')
    }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <form className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </form>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? <span>{user.displayName}</span> : <Link to="/login"><span>Login</span></Link>}
          <hr />
        </div>

        {user && <span style={{cursor:'pointer'}} className='logout-btn' onClick={handleLogout}>Logout</span>}
         <Link to="/create">
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
         </Link>
      </div>
    </div>
  );
}

export default Header;
