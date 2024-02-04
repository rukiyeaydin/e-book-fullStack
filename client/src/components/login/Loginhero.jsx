import React, { useState, useContext } from 'react'
import './login.css'
import authorclub from './authorclub.png'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import {UserContext} from "../../App"

const Loginhero = () => {
  const {state, dispatch} = useContext(UserContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = () => {
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      toast("geçersiz mail adresi")
      return
    }
    fetch("http://localhost:5000/login", {
      method: "post",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    }).then(res => res.json())
    .then(data => {
      // console.log(data)
      if(data.error){
        toast(data.error)
      }
      else{
        localStorage.setItem("jwt", data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        dispatch({type: "USER", payload: data.user})
        toast("giriş başarılı")
        navigate('/anasayfa')
      }
    }).catch(err => {
      console.log(err)
    })
  }
    

  return (
    <div className='loginhero'>
      <img src={authorclub} alt="authorclub img" className='lhimg'/>
      <div className="lginputs">
        <h3 style={{marginBottom:"10px"}}>Giriş Yap</h3>
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
        className='lhi2' 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <button className='lhbuton' onClick={() => handleSubmit()}>Giriş yap</button>
        <div className="">
          <p className='lhhy'>Hesabın yok mu? <Link to="/signup">Kaydol</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Loginhero
