import React, { useState } from "react";
import "./modal.css";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";


export default function Modal() {
  const [modal, setModal] = useState(false)
  const [search, setSearch] = useState('')
  const [bookDetails, setBookDetails] = useState([])

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const fetchBooks = (query) => {
    setSearch(query)
    if (query.trim() === '') {
      setBookDetails([]); // Eğer input boşsa, boş bir dizi ile temizle
    } else {
      fetch('http://localhost:5000/search-books', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
        }),
      })
        .then((res) => res.json())
        .then((results) => {
          console.log(results);
          setBookDetails(results.book);
        });
    }
  }

  return (
    <>
      <div onClick={toggleModal} className="btn-modal"><FaSearch className="modalikon"/></div>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlaymodal"></div>
          <div className="modal-content">
            <div className="modalinput">
              <input type="text" placeholder="Kitap Adı" className="modalinputin" value={search} onChange={(e) => fetchBooks(e.target.value)}/>
            </div>
            {bookDetails.length === 0 ? 
            <p style={{color:"white"}}>Sonuç bulunamadı</p>
            :
            <div className="modal-results">
              {bookDetails.length === 0 ? (
                <p>Sonuç bulunamadı</p>
              ) : (
                bookDetails.map((item) => (
                  <div className="modal-result" key={item.id}>
                    <Link className="modal-result-link" to={`/kitapinfo/${item._id}`} onClick={toggleModal}>{item.title}</Link>
                  </div>
                ))
              )}
            </div>
            }
            <div className="close-modal" onClick={toggleModal}>            <IoIosClose className="close-modal-icon"/></div>
          </div>
        </div>
      )}
    </>
  );
}