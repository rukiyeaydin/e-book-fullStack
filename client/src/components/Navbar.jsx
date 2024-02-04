import React, { useState, useEffect, useRef, useContext } from 'react';
import "./Navbar.css";
import { Link, useLocation } from 'react-router-dom';
import {FaBars, FaTimes} from "react-icons/fa";
import { BiSolidPencil } from 'react-icons/bi'
import logo from '../images/Rkm.png';
import Dropdown from './dropdown/Dropdown';
import { UserContext } from '../App';
import Modal from '../components/modal/Modal'

const Navbar = () => {
  const {state, dispatch} = useContext(UserContext)
  const location = useLocation();
  const[openNavbar, SetOpenNavbar] = useState(false);
  const handleClick = () => SetOpenNavbar(!openNavbar);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const RenderList = () => {
    if(state){
      return [
        <li key="anasayfa"><Link to="/anasayfa" className={`navbar-links ${location.pathname === '/anasayfa' ? 'active' : ''}`}>Anasayfa</Link></li>,
        <li key="kategoriler"><Link to="/kategoriler" className={`navbar-links ${location.pathname === '/kategoriler' ? 'active' : ''}`}>Kategoriler</Link></li>,
        <li key="yaz">
          <Link to="/yaz" className={`navbar-links ${location.pathname === '/yaz' ? 'active' : ''}`}>
            <div className="yaz">
              <BiSolidPencil className='pencil'/>
              <p>Yaz</p>
            </div>
          </Link>
        </li>,
        <li key="profil">
          <div className={`navbar-links ${location.pathname === '/Profile' ? 'active' : ''}`}>
            <div ref={dropdownRef} onClick={toggleDropdown} className='profilresmidiv'>
              <img src={state.profilResmi} alt="profil" className='profilresmi'  />
              {isDropdownOpen && <Dropdown />}
            </div>
          </div>
        </li>
      ]
    } else{
      return [
        <li key="login"><Link to="/login" className={`navbar-links ${location.pathname === '/login' ? 'active' : ''}`}>Giriş Yap</Link></li>,
        <li key="signup"><Link to="/signup" className={`navbar-links ${location.pathname === '/signup' ? 'active' : ''}`}>Kaydol</Link></li>,
      ]
    }
  }

  // Dış tıklamayı yakalayacak işlev
  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Sayfa her yenilendiğinde dış tıklamayı dinle
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      // Sayfa yenilenirken event listener'ı kaldır
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className={openNavbar ?  "navbar" : "navbar active"} id='top'>
        <Link to={state ? "/anasayfa" : "/"} className='navbar-logo' style={{display:'flex',alignItems:'center',justifyContent:'center'}}><img src={logo} alt="logo" className='logo'/><h3 className='font-bold'>RKM</h3></Link>
        {state ? <Modal /> : ""}

        <ul className={openNavbar ?  "navbar-menu active" : "navbar-menu"}>
          <RenderList/>
        </ul>

        {/* {isDropdownOpen && <Dropdown />} */}
        <div className="acKapaMenu" onClick={handleClick}>
            {openNavbar ? <FaTimes /> : <FaBars />}
        </div>
    </div>
  )
}

export default Navbar