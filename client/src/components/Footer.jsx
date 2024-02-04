import React from 'react'
import './footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {

  return (
    <div className='footer'>
      <ul className="fsec1">
        <li><a>Premium Dene</a></li>
        <li><a href='https://play.google.com/store/apps?gl=TR&utm_source=emea_Med&utm_medium=hasem&utm_content=Nov2020&utm_campaign=Evergreen&pcampaignid=MKT-EDR-emea-tr-1001280-Med-hasem-ap-Evergreen-Nov2020-Text_Search_BKWS%7cONSEM_kwid_43700013293089236&gclid=Cj0KCQjwsp6pBhCfARIsAD3GZubVvzobL12HoDN9UVNuJ9cUUI8kS1nnQKeLLopX253bcrkgOA00e-4aAkqbEALw_wcB&gclsrc=aw.ds' target='_blank'>Uygulamayı İndir</a></li>
      </ul>
      <ul className="fsec2">
        <li><Link to='/politikalar?section=kosullar' target='_top'>Koşullar</Link></li>
        <li><Link to='/politikalar?section=gizlilik' target='_top'>Gizlilik</Link></li>
        <li><Link to='/politikalar?section=yardim' target='_top'>Yardım</Link></li>
        <li className='none'><a>© 2023 RKM</a></li>
      </ul>
    </div>
  )
}

export default Footer
