import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import './yazicerik.css';
import { toast } from 'react-toastify';

const Yazicerik = () => {
  const [currentBook, setCurrentBook] = useState(null);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [sayfaBaslik, setSayfaBaslik] = useState('')

  useEffect(() => {
    fetch("http://localhost:5000/allbooks", {
      headers:{
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
    .then(res => res.json())
    .then(result => {
      // console.log(result)
      setData(result.books);
    });
  }, []);


  useEffect(() => {
    setCurrentBook(data.find(item => item._id === id));
    const kitap = data.find(item => item._id === id);
    const initialContent = kitap ? kitap.content : '';
    const initialSayfaBaslik = kitap ? kitap.pageTitle : '';
    // console.log({ initialContent })
    setValue(initialContent)
    setSayfaBaslik(initialSayfaBaslik)
  }, [data, id]);

  const handleKaydet = async () => {
    const pages = currentBook.pages.length ? currentBook.pages : [];
    pages.push({ pageTitle: sayfaBaslik, content: value });
  
    if (id && value && sayfaBaslik !== '') {
      try {
        const response = await fetch(`http://localhost:5000/updateContent/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem('jwt'),
          },
          body: JSON.stringify({ pages }),
        });
  
        const result = await response.json();
        // console.log('Güncellenen kitap: ', result.book);
        toast('Kitap güncellendi');
  
        setCurrentBook(result.book);
  
        setValue('');
        setSayfaBaslik('');
  
      } catch (error) {
        console.error('Hata:', error);
      }
    }
  };

  return (
    <div className='yazicerik'>
      <h2 className='yazbaslik'>{currentBook ? currentBook.title : "..."}</h2>
      <div className="yazicerikbb">
        <p className='yhbaslik'>Bölüm Başlığı</p>
        <input type="text" placeholder='Bölüm başlığı' className='yazicerikinput' value={sayfaBaslik} onChange={(e) => setSayfaBaslik(e.target.value)}/>
      </div>
      <div className='quillm'>
        <ReactQuill value={value} onChange={setValue} />
      </div>
      <button className='yazicerikbtn' onClick={handleKaydet}>
        Kaydet
      </button>
    </div>
  );
};

export default Yazicerik;
