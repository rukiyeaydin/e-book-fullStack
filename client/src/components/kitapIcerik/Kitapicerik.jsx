import React, { useState, useEffect, useContext } from 'react'
import './kitapicerik.css'
import { Link, useParams } from 'react-router-dom'
import { AiFillEye, AiFillStar } from 'react-icons/ai'
import { UserContext } from "../../App"
import Yukleniyorc from '../Yukleniyorc'


const Kitapicerik = () => {
  const [page, setPage] = useState('')
  const [data, setData] = useState([])
  const { state, dispatch } = useContext(UserContext)
  const { id } = useParams(); // ID'yi al


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

  const kitap = data.find(item => item._id === id)
  // console.log(kitap)

  const likeBook = (id) => {
    fetch("http://localhost:5000/like", {
      method: "put",
      headers:{
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        bookId: id
      })
    }).then(res => res.json())
    .then(result => {
      // console.log(result)
      const newData = data.map(item => {
        if(item._id == result._id){
          return result
        } else{
          return item
        }
      })
      setData(newData)
    }).catch(err => {
      console.log(err)
    })
  }

  const unlikeBook = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "put",
      headers:{
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        bookId: id
      })
    }).then(res => res.json())
    .then(result => {
      // console.log(result)
      const newData = data.map(item => {
        if(item._id == result._id){
          return result
        } else{
          return item
        }
      })
      setData(newData)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    fetch(`http://localhost:5000/updateViews/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
    .then(result => {})
    .catch(err => {
      console.log(err)
    })
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setPage(data.find((item) => item._id === id)?.pages[0]?.pageTitle || '');
    }
  }, [data, id]);

  return (
    <>
    {kitap ? 
      <div className='kitapicerik'>
        <div className="kitiust">
          <h2>{kitap.title}</h2>
          <div className="kiticount">
            <div className="kitistatik">
              <span className="ki-read-count">
                <AiFillEye className='kitiicon'/>{kitap.views}
              </span>
              <span className="ki-vote-count">
                <AiFillStar className='kitiicon'/>{kitap.likes.length}
              </span>
            </div>
            <p>by <b><Link to={`/profil/${kitap.author.username}`} target='_top' className='kitby'>{kitap.author.username}</Link></b></p>
            <div className="yildizla">
              {kitap.likes.includes(state._id)
              ?
              <AiFillStar className= "yildizlaiconactive" onClick={() => {unlikeBook(kitap._id)}} />
              :
              <AiFillStar className= "yildizlaicon" onClick={() => {likeBook(kitap._id)}} />
              }
            </div>
            <form className='kiform'>
              <select value={page} onChange={(e) => setPage(e.target.value)}>
                {kitap.pages.map((sayfa,index) => (
                  <option key={index} value={sayfa.pageTitle}>{sayfa.pageTitle}</option>
                ))}
              </select>
            </form>
          </div>
        </div>
        <div className="kitalt">
          {/* <p>{<div dangerouslySetInnerHTML={{ __html: kitap.content }} />}</p> */}
          <p dangerouslySetInnerHTML={{ __html: page && kitap.pages.find((sayfa) => sayfa.pageTitle === page)?.content }} />
        </div>
        {state.username === kitap.author.username ?        
          <button className='btnduzenle'><Link to={kitap ? `/duzenle/${kitap._id}` : "yükleniyor"} className='btnlink'>Düzenle</Link></button> :
        ""}
      </div>
      :
      <div style={{height:"80vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Yukleniyorc />
      </div>

    }
    </>
  )
}

export default Kitapicerik
