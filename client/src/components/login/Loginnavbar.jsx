import React from 'react'
import './login.css'
import rkm from '../../../Rkm.png'

const Loginnavbar = () => {
    const style = {
        transform: 'scaleX(-1)',
      };

  return (
    <div className='loginnavbar'>
        <p style={style} className='lnp'>RKM</p>
        <a href="/"><img src={rkm} alt="" /></a>
        <p className='lnp'>RKM</p>
    </div>
  )
}

export default Loginnavbar
