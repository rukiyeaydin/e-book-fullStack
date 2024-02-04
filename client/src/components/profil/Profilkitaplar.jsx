import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AiFillEye, AiFillStar } from 'react-icons/ai'
import { UserContext } from '../../App'
import Yukleniyorc from '../Yukleniyorc'

const Profilkitaplar = () => {
  const {state, dispatch} = useContext(UserContext)
  const { username } = useParams()
  const [data, setData] = useState([])
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/allbooks", {
      headers:{
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
    .then(result => {
      setData(result.books); 
    })
  }, []);
  
  useEffect(() => {
    if (data.length > 0 && state && state.username) {
      const userBooks = data.filter(item => item.author.username === username)
      if (userBooks.length > 0) {
        setBooks(userBooks);
      }
    }
  }, [data, state]);

  // console.log(data);

  if (data.length === 0) {
    return (
      <div style={{height:"40vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Yukleniyorc />
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="" style={{height:"40vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <p>Kitap bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="phalt">
      {/* <p style={{borderBottom:'1px solid black'}} className='phaltbaslik'>Kitaplar</p> */}
        <div className="phkitaplar">
          {books.map(item => {
            return(
              <div className="phkitap" key={item._id}>
                <Link  to={`/kitapinfo/${item._id}`} target='_top'><img src={item.kapakResmi} alt="" /></Link>
                <div className="phsag">
                  <Link  to={`/kitapinfo/${item._id}`} className="phbaslik" target='_top'>{item.title}</Link>
                  <div className="phstat">
                    <span className="read-count">
                      <AiFillEye className='phicon'/>{item.views}
                    </span>
                    <span className="vote-count">
                      <AiFillStar className='phicon'/>{item.likes.length}
                    </span>
                  </div>
                  <div className="phtext">
                    <p>{item.shortDesc}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default Profilkitaplar
