import React, { useContext } from 'react'
import './dropdown.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'

const Dropdown = () => {
  const {state, dispatch} = useContext(UserContext)
  const navigate = useNavigate()

  const logOut = () => {
    localStorage.clear()
    dispatch({type: "CLEAR"})
    navigate("/login")
  }

  return (
    <div className="dropdown">
      <ul>
        <Link className='dlink' to={`/profilim/${state.username}`} ><li>Profilim</li></Link>
        <hr />
        <Link className='dlink' to="/ayarlar"><li>Ayarlar</li></Link>
        <hr />
        <div className='dlink' onClick={() => logOut()}><li>Çıkış yap</li></div>
      </ul>
    </div>
  )
}

export default Dropdown
