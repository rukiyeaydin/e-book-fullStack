import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import './duzenle.css';
import { toast } from 'react-toastify';

const Duzenle = () => {
  const { id } = useParams();
  const [pages, setPages] = useState([])
  const [currentBook, setCurrentBook] = useState(null)
  const [currentPage, setCurrentPage] = useState({})
  const [editedPage, setEditedPage] = useState({})

  useEffect(() => {
    fetch("http://localhost:5000/allbooks", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => {
        const currentBook = result.books.find(item => item._id === id);
        setCurrentBook(currentBook);
  
        if (currentBook && currentBook.pages) {
          setPages(currentBook.pages);
  
          const initialPage = currentBook.pages[0] || {};
          setCurrentPage(initialPage);
          setEditedPage(initialPage); // Set editedPage to match the initial page's content
        }
      });
  }, [id]);

  const handlePageChange = (e) => {
    const selectedPageTitle = e.target.value;
    const selectedPage = pages.find(page => page.pageTitle === selectedPageTitle);
    
    setCurrentPage(selectedPage);
    setEditedPage(selectedPage);
  };

  const handleKaydet = async () => {
    const pageIndex = pages.findIndex(page => page.pageTitle === currentPage.pageTitle);
    pages[pageIndex] = editedPage;
  
    // Make API call
    if (id && currentBook !== '') {
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
        console.log('Güncellenen kitap: ', result.book);
        toast('Kitap güncellendi');
  
      } catch (error) {
        console.error('Hata:', error);
      }
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Bu sayfayı silmek istediğinize emin misiniz?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/deletePage/${id}/${currentPage.pageTitle}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
          },
        });
    
        const result = await response.json();
        toast('Sayfa Silindi');
  
        setTimeout(() => {
          window.location.reload();
        }, 2000); 
    
      } catch (error) {
        console.error('Error:', error);
      }
    }

  };

  return (
    <div className='yazicerik'>
      <h2 className='yazbaslik'>{currentBook ? currentBook.title : "..."}</h2>
      <div className="yazicerikbb">
        <p className='yhbaslik'>Bölümler</p>
        <form className='duzenleform'>
            <select value={currentPage.pageTitle} onChange={handlePageChange}>
              {pages && pages.map((sayfa, index) => (
                <option key={index} value={sayfa.pageTitle}>{sayfa.pageTitle}</option>
              ))}
            </select>
        </form>
        <p className='yhbaslik'>Bölüm Başlığı</p>
        <input 
          type="text" 
          placeholder='Bölüm başlığı' 
          className='yazicerikinput' 
          value={editedPage ? editedPage.pageTitle : ""}
          onChange={(e) => setEditedPage(prevState => ({ ...prevState, pageTitle: e.target.value }))}
          />
      </div>
      <div className='quillm'>
        <ReactQuill value={editedPage.content} onChange={(content) => setEditedPage(prevState => ({ ...prevState, content }))} />
      </div>
      <div className="yazicerikbtns">
        <button className='yazicerikbtnkaydet' onClick={handleKaydet}>Kaydet</button>
        <button className='yazicerikbtnsil' onClick={handleDelete}>Sayfayı Sil</button>
      </div>
    </div>
  );
};

export default Duzenle;
