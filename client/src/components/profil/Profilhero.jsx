import React, { useState, useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './profilhero.css'
import Profilkitaplar from './Profilkitaplar'
import Profiltakipciler from './Profiltakipciler'
import Profiltakipedilenler from './Profiltakipedilenler'
import { UserContext} from "../../App"


const Profilhero = () => {
  const {state, dispatch} = useContext(UserContext)
  const [activeTab, setActiveTab] = useState('kitaplar')
  const [data, setData] = useState([])
  const [myBooks, setMyBooks] = useState([])
  const { username } = useParams()

  useEffect(() => {
    fetch("http://localhost:5000/allbooks", {
      headers:{
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
    .then(result => {
      // console.log(result)
      setData(result.books)
    })
  },[])

  useEffect(() => {
    if (data && data.length > 0 && state && state.username) {
      const userBooks = data.filter(item => item.author.username === username);
      if (userBooks.length > 0) {
        setMyBooks(userBooks);
      }
    }
  }, [data, state, username]);

  // console.log(myBooks)
  // const followers = myBooks.length > 0 ? myBooks[0].author.followers.length : 0;
  // const following = myBooks.length > 0 ? myBooks[0].author.following.length : 0;
  

  return (
    <div className='profilhero'>
      {state ? 
        <div className="phust">
          <img src={state.profilResmi} alt="profil resmi" className='phaurora'/>
          <p className='phustisim'>{state.name}</p>
          <p className='phusername'>@{state.username}</p>
          <div className="phistatistik">
              <div className="phwork">
                  <p>Kitap sayısı</p>
                  <p>{myBooks.length}</p>
              </div>
              <div className="phwork">
                  <p>Takipçiler</p>
                  <p>{state.followers.length}</p>
              </div>
              <div className="phtakipci">
                  <p>Takip Edilenler</p>
                  <p>{state.following.length}</p>
              </div>
          </div>
        </div>
      : 
      <p>loading</p>}

      <div className="phorta">
        <Link className={activeTab === 'kitaplar' ? 'kitaplarLink active' : 'kitaplarLink'} onClick={() => setActiveTab('kitaplar')}>Kitaplar</Link>
        <Link className={activeTab === 'takipciler' ? 'takipcilerLink active' : 'takipcilerLink'} onClick={() => setActiveTab('takipciler')}>Takipçiler</Link>
        <Link className={activeTab === 'takipEdilenler' ? 'takipedilenlerLink active' : 'takipedilenlerLink'} onClick={() => setActiveTab('takipEdilenler')}>Takip Edilenler</Link>
      </div>

      <div className='phaltfull'>
        {activeTab === "kitaplar" && <Profilkitaplar/>}
        {activeTab === "takipciler" && <Profiltakipciler />}
        {activeTab === "takipEdilenler" && <Profiltakipedilenler />}
      </div>

    </div>
  )
}

export default Profilhero
