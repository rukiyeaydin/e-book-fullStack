import React, { useState, useContext, useEffect } from 'react'
import './ayarlar.css'
import { BiSolidEdit } from 'react-icons/bi'
import { UserContext } from '../../App'
import { toast } from 'react-toastify'

const Ayarlarhero = () => {
  const { state, dispatch } = useContext(UserContext)

  const [kullaniciAdi, setKullaniciAdi] = useState("")
  const [mail, setMail] = useState("")
  const [isKullaniciAdiClicked, setIsKullaniciAdiClicked] = useState(false)
  const [isMailClicked, setIsMailClicked] = useState(false)
  const [image, setImage] = useState("")

  useEffect(() => {
    if (state) {
      setKullaniciAdi(state.username || "");
      setMail(state.email || "");
    }
  }, [state]);

  const handleKullaniciAdiEdit = () => {
    if (isKullaniciAdiClicked) {
      setIsKullaniciAdiClicked(false);
    } else {
      setIsKullaniciAdiClicked(true);
    }
  }


  const handleMailEdit = () =>{
    if(isMailClicked){
      setIsMailClicked(false);
    } else{
      setIsMailClicked(true);
    }
  }


  const updatePic = async () => {
    if (image) {
      try {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "e-book");
        data.append("cloud_name", "rukiyeaydincloud");
        const cloudinaryResponse = await fetch(
          "https://api.cloudinary.com/v1_1/rukiyeaydincloud/image/upload",
          {
            method: "post",
            body: data,
          }
        );
        const cloudinaryData = await cloudinaryResponse.json();
        const updatePicResponse = await fetch("http://localhost:5000/updatepic", {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            profilResmi: cloudinaryData.url,
          }),
        });
        const updatePicData = await updatePicResponse.json();
        localStorage.setItem("user", JSON.stringify({ ...state, profilResmi: cloudinaryData.profilResmi }));
        dispatch({ type: "UPDATEPIC", payload: updatePicData.profilResmi });
      } catch (error) {
        console.log(error);
      }
    }
    updateFields()
  }

  const updateFields = () => {
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail)){
      toast("geçersiz mail adresi")
      return
    }

    fetch("http://localhost:5000/updatefields", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        username: kullaniciAdi,
        email: mail,
      })
    }).then(res => res.json())
    .then(result => {
      // console.log(data)
      localStorage.setItem("user", JSON.stringify({ ...state, username: kullaniciAdi, email: mail }));
      dispatch({ type: "UPDATEFIELDS", payload: { username: result.username, email: result.email }});
      toast("Değişiklikler kaydedildi")
    }).catch(err => {
      console.log(err)
    })
  }

  const updateInfo = () => {
    if(image){
      updatePic()
    }
    else{
      updateFields();
    }
  }
  
  return (
    <div className='ayarlarhero'>
      <p className='ahbaslik'>Ayarlar</p>
      <div className="ahblock">
        <div className="ahun">
          <p className='ahleft'>Kullanıcı adı</p>
          <div className="ahalt">
            {/* <p className='ahright'>{kullaniciAdi}</p> */}
            <div className="ahright">
              {isKullaniciAdiClicked ? 
              <input type="text" className='ahrightinput' value={kullaniciAdi}  onChange={e => setKullaniciAdi(e.target.value)} /> : 
              <input type="text" className='ahrightinputsec' value={kullaniciAdi} readOnly/>}
            </div>
              {isKullaniciAdiClicked ? <button onClick={handleKullaniciAdiEdit} className='ahkaydetedit'>kaydet</button> : 
              <BiSolidEdit className='ahicon' onClick={handleKullaniciAdiEdit}/>}
          </div>
        </div>
        {/* <div className="ahpw">
          <p className='ahleft'>Şifre</p>
          <div className="ahalt">
            <div className="ahright">
              {isPasswordClicked ? 
              <input type="text" className='ahrightinput' value={password}  onChange={e => setPassword(e.target.value)} /> : 
              <input type="password" className='ahrightinputsec' value={password} readOnly/>}
            </div>
            {isPasswordClicked ? <button onClick={handlePasswordEdit} className='ahkaydetedit'>kaydet</button> : 
            <BiSolidEdit className='ahicon' onClick={handlePasswordEdit}/>}
          </div>
        </div> */}
        <div className="ahmail">
          <p className='ahleft'>Email</p>
          <div className="ahalt">
            <div className="ahright">
              {isMailClicked ? 
              <input type="text" className='ahrightinput' value={mail}  onChange={e => setMail(e.target.value)} /> : 
              <input type="text" className='ahrightinputsec' value={mail}  readOnly /> }
            </div>
            {isMailClicked ? <button onClick={handleMailEdit} className='ahkaydetedit'>kaydet</button> : 
            <BiSolidEdit className='ahicon' onClick={handleMailEdit}/>}
          </div>
        </div>
        <div className="ahbd">
          <p className='ahleft'>Profil resmi</p>
          <div className="ahalt">
            <div className='ahright'>          
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <BiSolidEdit className='ahicondif'/>
          </div>
        </div>
        <button className='ahkaydet' onClick={() => updateInfo()}>Kaydet</button>
      </div>

    </div>
  )
}

export default Ayarlarhero
