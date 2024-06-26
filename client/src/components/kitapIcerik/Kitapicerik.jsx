import React, { useState, useEffect, useContext } from 'react'
import './kitapicerik.css'
import { Link, useParams } from 'react-router-dom'
import { AiFillEye, AiFillStar } from 'react-icons/ai'
import { UserContext } from "../../App"
import Yukleniyorc from '../Yukleniyorc'
import { IoArrowForwardSharp, IoArrowBackOutline  } from "react-icons/io5";


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
      if (kitap) {
        const bookProgress = state.booksRead.find(item => item.book === id)?.progress || 0;
        setPage(kitap.pages[bookProgress]?.pageTitle || '');
      }
    }
  }, [data, id, state && state.booksRead]);
  
  const handlePreviousPage = () => {
    const currentIndex = kitap.pages.findIndex(sayfa => sayfa.pageTitle === page);
    if (currentIndex > 0) {
      setPage(kitap.pages[currentIndex - 1].pageTitle);
      updateProgress(-1);
      updateLocalStorage(-1);
    }
  };
  
  const handleNextPage = () => {
    const currentIndex = kitap.pages.findIndex(sayfa => sayfa.pageTitle === page);
    if (currentIndex !== -1 && currentIndex < kitap.pages.length - 1) {
      setPage(kitap.pages[currentIndex + 1].pageTitle);
      updateProgress(1);
      updateLocalStorage(1);
    }
  };

  const updateProgress = (progress) => {
    fetch(`http://localhost:5000/updateProgress/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({ progress: progress }),
    })
    .then(result => {

    })
    .catch(err => {
      console.log(err)
    })
  };

  const updateLocalStorage = (progress) => {
    if (state && state.booksRead) {
      const bookIndex = state.booksRead.findIndex(item => item.book === id);
      if (bookIndex !== -1) {
        const updatedBooksRead = [...state.booksRead];
        updatedBooksRead[bookIndex].progress += progress; // İlerlemeyi güncelle
        localStorage.setItem('user', JSON.stringify({ ...state, booksRead: updatedBooksRead }));
      }
    }
  };


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
            <p className='kipageheader'>{page}</p>
          </div>
        </div>
        <div className="kitalt">
          {/* <p>{<div dangerouslySetInnerHTML={{ __html: kitap.content }} />}</p> */}
          <p dangerouslySetInnerHTML={{ __html: page && kitap.pages.find((sayfa) => sayfa.pageTitle === page)?.content }} />
          <div style={{width:"100%" ,display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:"30px"}}>
            <IoArrowBackOutline 
            style={{opacity: kitap.pages.findIndex(sayfa => sayfa.pageTitle === page) === 0 ? 0 : 1, zIndex: kitap.pages.findIndex(sayfa => sayfa.pageTitle === page) === 0 ? -10 : 1}} 
            onClick={handlePreviousPage} 
            className='kitalt-cbutton' 
            />
            <IoArrowForwardSharp 
            style={{ opacity: kitap.pages.findIndex(sayfa => sayfa.pageTitle === page) === kitap.pages.length - 1 ? 0 : 1, zIndex: kitap.pages.findIndex(sayfa => sayfa.pageTitle === page) === kitap.pages.length - 1 ? -10 : 1}} 
            onClick={handleNextPage} 
            className='kitalt-cbutton'
            />
          </div>

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
