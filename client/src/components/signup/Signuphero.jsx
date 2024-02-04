import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './signup.css'
import { toast } from 'react-toastify';

const Signuphero = () => {
  const navigate = useNavigate()
  const [image, setImage] = useState("")
  const [url, setUrl] = useState(undefined) // eğer kullanıcı profil seçmezse default resim seçilsin diye
  const [name, setName] = useState("")
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect (() => {
    if(url){
      uploadFields()
    }
  },[url])

  const uploadPic = () => {
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

  const uploadFields = () => {
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      toast("geçersiz mail adresi")
      return
    }
    fetch("http://localhost:5000/signup", {
      method: "post",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name: name,
        username: userName,
        email: email,
        password: password,
        profilResmi: url,
      })
    }).then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.error){
        toast(data.error)
      }
      else{
        toast(data.message)
        navigate('/login')
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const handleSubmit = () => {
    if(image){
      uploadPic();
    }else{
      uploadFields();
    }
  }

  return (
    <div className='signuphero'>
        <div className="lginputs">
            <h2 className='aramizakatil'>Aramıza Katıl</h2>
            <input 
            type="text" 
            placeholder='Ad - Soyad' 
            className='lhi1' 
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <input 
            type="text" 
            placeholder='Kullanıcı adı' 
            className='lhi1' 
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            />
            <input 
            type="text" 
            placeholder='Email' 
            className='lhi1' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <input 
            type="password" 
            placeholder='Şifre' 
            className='lhi1' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div className="shfile">
          <p className='shfilep'>Profil resmi</p>
          <input 
          type="file" 
          onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button className='lhbuton' onClick={() => handleSubmit()}>Kaydol</button>
        <p className='lhhy'>Hesabın var mı? <Link to="/login">Giriş yap</Link></p>
      </div>
  )
}

export default Signuphero
