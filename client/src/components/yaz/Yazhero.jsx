import React, { useEffect, useState } from 'react'
import './yaz.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Yazhero = () => {
  const navigate = useNavigate()
  const [category, setCategory] = useState("aksiyon")
  const [title, setTitle] = useState("")
  const [shortDesc, setShortDesc] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")

  useEffect(() => {
    if(url){
      fetch("http://localhost:5000/yaz", {
        method: "post",
        headers: {
          "Content-Type":"application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title: title,
          shortDesc: shortDesc,
          category: category,
          pic: url,
        })
      }).then(res => res.json())
      .then(data => {
        console.log(data);
        if(data.error){
          toast(data.error)
        }
        else{
          toast("kitap oluşturuldu")
          navigate(`/yaz/${data.book._id}`)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }, [url])


  const postBook = () => {

    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "e-book")
    data.append("cloud_name", "rukiyeaydincloud")
    fetch("https://api.cloudinary.com/v1_1/rukiyeaydincloud/image/upload", {
      method: "post",
      body: data
    })
    .then(res => res.json())
    .then(data => {
      setUrl(data.url)
    })
    .catch(err => {
      console.log(err)
    })

    if(!image){
      toast("bir resim seçin")
    }

  }

  return (
    <div className='yazhero'>
      <div className="yhimg">
        <div className="yhimgicerik">
          <p style={{marginBottom: "10px", fontWeight:"bold"}}>Kapak resmi yükle</p>
          <input 
          type="file" 
          onChange={(e) => setImage(e.target.files[0])}
          className='infile'/>
        </div>
      </div>
      <div className="yhcontext">
        <p className='yhdetaylar'>Detaylar</p>
        <div className="yhcontextbaslik">
          <p className='yhbaslik'>Başlık</p>
          <input type="text" 
          placeholder='Kitap başlığı' 
          className='yhinput'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="yhdesc">
          <p className='yhbaslik'>Kitabın kısa açıklaması</p>
          <textarea 
          type="text" 
          placeholder='Açıklama' 
          className='yhinput2'
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
          />
        </div>
        <div className="yhcategory">
          <p className='yhbaslik'>Kategori</p>
          <form className='yhform'>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="aksiyon">Aksiyon</option>
              <option value="ask">Aşk</option>
              <option value="bilimkurgu">Bilim kurgu</option>
              <option value="fantastik">Fantastik</option>
              <option value="korku">Korku</option>
              <option value="macera">Macera</option>
              <option value="mizah">Mizah</option>
              <option value="siir">Şiir</option>
              <option value="tarih">Tarih</option>
            </select>
          </form>
        </div>
        <button className='yhbuton' onClick={() => postBook()}>Sonraki Adım</button>
      </div>
    </div>
  )
}

export default Yazhero
