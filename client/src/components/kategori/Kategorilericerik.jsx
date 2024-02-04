import React, { useState, useEffect } from 'react';
import './kategorilericerik.css';
import { AiFillEye, AiFillStar } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom';
import Yukleniyorc from '../Yukleniyorc';

const Kategorilericerik = () => {
  const [data, setData] = useState('En çok okunanlar')
  const { kategori } = useParams()
  const [kitaplar, setKitaplar] = useState([])

  const words = kategori.split(" ")
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substring(1)
  }

  const handleInputChange = (event) => {
    setData(event.target.value);
  }

  useEffect(() => {
    fetch("http://localhost:5000/allbooks", {
      headers:{
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
    .then(res => res.json())
    .then(result => {
      const categoryBooks = result && result.books && result.books.filter(item => item.category === kategori)
  
      if (data === 'eco') {
        categoryBooks.sort((a, b) => b.views - a.views); // En çok okunanlar
      } else if (data === 'ecb') {
        categoryBooks.sort((a, b) => b.likes.length - a.likes.length); // En çok beğenilenler
      } else if (data === 'sc') {
        categoryBooks.reverse(); // Son çıkanlar
      }
  
      setKitaplar(categoryBooks);
    })
  }, [data, kategori]);
  
  // console.log(kitaplar)

  if (kitaplar.length === 0 ) {
    return (
      <div style={{height:"80vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Yukleniyorc />
      </div>
    );
  }

  return (
    <div className='kategorilericerik'>
      <h1 className='kih1'>{kategori == "bilimkurgu" ? "Bilim Kurgu" : words}</h1>
      <div className="ustbilgi">
        <form className='kiform'>
          <select value={data} onChange={handleInputChange}>
            <option value="eco">En çok okunanlar</option>
            <option value="ecb">En çok beğenilenler</option>
            <option value="sc">Son çıkanlar</option>
          </select>
        </form>
      </div>
      <div className="kikitaplar">
        {kitaplar.map(item => {
          return(
          <div className="kikitap" key={item._id}>
            <Link  to={`/kitapinfo/${item._id}`} ><img src={item.kapakResmi} alt="" /></Link>
            <div className="kisag">
              <Link  to={`/kitapinfo/${item._id}`} className='kibasliktop'><p className="kibaslik">{item.title}</p></Link>
              <Link to={`/profil/${item.author.username}`} className="kiyazar">{item.author.name}</Link>
              <div className="kiistatik">
                <span className="read-count">
                  <AiFillEye className='kiicon'/>{item.views}
                </span>
                <span className="vote-count">
                  <AiFillStar className='kiicon'/>{item.likes.length}
                </span>
              </div>
              <div className="kitext">
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

export default Kategorilericerik;
