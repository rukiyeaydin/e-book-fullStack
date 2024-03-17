import React, { useState, useEffect, useContext } from 'react'
import './kitapinfo.css'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { UserContext } from "../../App"
import { AiFillEye, AiFillStar } from 'react-icons/ai'
import Yukleniyorc from '../Yukleniyorc'
import { MdLibraryAdd } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import profilbg from "../../images/profilbg.jpg"

const Kitapinfo = () => {
  const [data, setData] = useState([])
  const { state, dispatch } = useContext(UserContext)
  const { id } = useParams(); // ID'yi al
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [newcomment, setNewComment] = useState("")

  const handleFocus = () => {
    setIsFocused(true);
  };

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

  const handleDeleteBook = () => {
    const confirmDelete = window.confirm('Bu kitabı silmek istediğinize emin misiniz?');
  
    if (confirmDelete) {
      fetch(`http://localhost:5000/deletebook/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        }
      })
      .then(res => res.json())
      .then(result => {
        // console.log(result);

        navigate(`/profilim/${state && state.username}`);
      })
      .catch(error => {
        console.error(error);
      });
    }
  };


  const handleAddCommentClick = async () => {
    if (id && newcomment) {
      try {
          const userResponse = await fetch(`http://localhost:5000/user`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  "Authorization": 'Bearer ' + localStorage.getItem('jwt'),
              },
          });
          const userData = await userResponse.json();
          // console.log(userData);
          
          const commentObject = {
              content: newcomment,
              user: {
                username: userData.username,
                profilResmi: userData.profilResmi,
                _id: userData._id
              } 
          };

          const response = await fetch(`http://localhost:5000/commentBook/${id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  "Authorization": 'Bearer ' + localStorage.getItem('jwt'),
              },
              body: JSON.stringify({ comment: commentObject }),
          });

          const result = await response.json();

          setNewComment("")
          fetchBookData();
          setIsFocused(false)

          // console.log("Kitap güncellendi");
          // console.log('Güncellenen kitap: ', result);

        } catch (error) {
            console.error('Hata:', error);
        }
      }

    };
    const fetchBookData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/allbooks`, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          }
        });
        const result = await response.json();
        setData(result.books);
      } catch (error) {
        console.error('Hata:', error);
      }
    };


  if (!kitap) {
    return (
      <div style={{height:"80vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Yukleniyorc />
      </div>
    );
  }

  return (
    <div className='kitapinfo'>
        <div className="kitapinfoinc">
            <div className="kitapinfoleft">
                <img src={kitap ? kitap.kapakResmi : "yükleniyor"} alt="" />
            </div>
            <div className="kitapinforight">
                <h3 style={{marginBottom:"10px"}}>{kitap ? kitap.title : "yükleniyor"}</h3>
                <p className='kitapinfoshortdesc'>{kitap? kitap.shortDesc : "yükleniyor"}</p>
                <p style={{marginTop:"20px"}}><b>Kategori :  </b> <Link className='kitapinfolinks' to={`/kategoriler/${kitap ? kitap.category : ""}`}>{kitap ? kitap.category : "yükleniyor"}</Link></p>
                <p style={{marginTop:"20px"}}><b>Yazar :  </b> <Link className='kitapinfolinks' to={`/profil/${kitap ? kitap.author.username : ""}`} >{kitap ? kitap.author.name : "yükleniyor"}</Link></p>
                <div className="infoistatistik">
                  <span className="info-count">
                    <AiFillEye/>{kitap ? kitap.views : ""}
                  </span>
                  <span className="info-count">
                    <AiFillStar/>{kitap ? kitap.likes.length : ""}
                  </span>
                </div>
                <button className='kitapinfobuton'><Link target='_top'to={`/kitap/${id}`}  className='kitapinfolink'>Okumaya Başla</Link></button>
                {kitap.author._id == state._id ? 
                  <div className="infoedits">
                    <Link className='infoedit' to={kitap ? `/duzenle-genel/${kitap._id}` : "yükleniyor"}>
                      <p style={{fontSize:"15px", fontWeight:"bolder", textDecoration:"none", marginRight:"5px"}}>Düzenle</p>
                      <FiEdit/>
                    </Link>
                    <Link className='infoedit' to={kitap ? `/yaz/${kitap._id}` : "yükleniyor"} >
                      <p style={{fontSize:"15px", fontWeight:"bolder", textDecoration:"none", marginRight:"5px"}}>Yeni sayfa</p>
                      <MdLibraryAdd/>
                    </Link>
                    <div className='infotrash' onClick={handleDeleteBook} style={{display:"flex", alignItems:"center", justifyContent:"center"}} >
                      <p style={{fontSize:"15px", fontWeight:"bolder", textDecoration:"none", marginRight:"5px"}}>Sil</p>
                      <FaTrash />
                    </div>
                   
                  </div>
                : "" }

                <div className="comments" style={{marginTop:"30px"}}>
                  <p style={{fontWeight:"bolder", fontSize:"18px", borderBottom:"1px solid black", paddingBottom:"5px", width:"100%"}}>{kitap.comments.length} Yorum</p>

                  <div className="add-comment">
                    <input 
                      type="text" 
                      placeholder='Yorum Ekleyin...' 
                      className='add-comment-input' 
                      onFocus={handleFocus}
                      value={newcomment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    {isFocused && (
                      <>
                        <button className="add-comment-iptal" onClick={() => setIsFocused(false)}>İptal</button>
                        <button className="add-comment-ekle" onClick={handleAddCommentClick}>Ekle</button>
                      </>
                    )}
                  </div>
                  {kitap.comments.map(item => {
                    return(
                      <div className="single-comment" key={item._id}>
                        <Link to={`/profil/${item.user.username}`}><img src={item.user.profilResmi} alt="profile" className='comment-profil-img'/></Link>
                        <div className="comment">
                        <Link to={`/profil/${item.user.username}`} style={{fontWeight:"bold", fontSize:"15px", textDecoration:"none", color:"black"}}>{item.user.username}</Link>
                          <p style={{fontSize:"14px"}} className='comment-content'>{item.content}</p>
                        </div>
                      </div>
                    )
                  })}

                </div>

            </div>
        </div>
    </div>
  )
}

export default Kitapinfo
