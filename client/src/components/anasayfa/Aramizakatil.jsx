import React from 'react'
import './aramizakatil.css'
import { Link } from 'react-router-dom'

const Aramizakatil = () => {
  return (
    <div className='aramizakatil'>
        <h3 className='aramizakatilbaslik'>HEMEN KAYDOL</h3>
        <Link to="/signup" className='aramizakatillink'>Aramıza Katıl</Link>
    </div>
  )
}

export default Aramizakatil