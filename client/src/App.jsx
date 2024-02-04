import './App.css';
import {Routes, Route, useNavigate, BrowserRouter } from "react-router-dom";
import React, { useEffect, createContext, useReducer, useContext } from 'react';
import {reducer, initialState} from "./reducers/userReducer"

import Anasayfa from './routes/Anasayfa';
import Politikalar from './routes/Politikalar'
import Kategoriler from './routes/Kategoriler';
import Yaz from './routes/Yaz';
import Profil from './routes/Profil'
import ProfilOthers from './routes/ProfilOthers'
import Ayarlar from './routes/Ayarlar';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Kitap from './routes/Kitap';
import Yaznext from './routes/Yaznext';
import Kokdizin from './routes/Kokdizin';
import Aksiyon from './routes/kategoriler/Aksiyon';
import Kitapinforoute from './routes/Kitapinforoute';
import Sayfaduzenle from './routes/Sayfaduzenle';
import DuzenleGenel from './routes/DuzenleGenel'
import Notfound from './components/Notfound';

export const UserContext = createContext()

const Routing = () => {
  const navigate = useNavigate()
  const {state, dispatch} = useContext(UserContext)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    
    if(user){
      dispatch({type: "USER", payload: user})
      // navigate("/anasayfa")
    } else{
      navigate("/login")
    }

  }, [])

  return(
    <Routes>
      <Route path="/" element={state ? <Anasayfa/> : <Kokdizin/>} />
      <Route path="/anasayfa" element={<Anasayfa/>} />
      <Route path="/politikalar" element={<Politikalar/>} />
      <Route path='/kategoriler' element={<Kategoriler/>} />
      <Route path='/yaz' element={<Yaz/>} />
      <Route path='/profilim/:username' element={<Profil/>} />
      <Route path='/profil/:username' element={<ProfilOthers/>} />
      <Route path='/ayarlar' element={<Ayarlar/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/kitap/:id' element={<Kitap/>} />
      <Route path='/yaz/:id' element={<Yaznext/>} />
      <Route path='/kategoriler/:kategori' element={<Aksiyon/>} />
      <Route path='/kitapinfo/:id' element={<Kitapinforoute/>} />
      <Route path='/duzenle/:id' element={<Sayfaduzenle/>} />
      <Route path='/duzenle-genel/:id' element={<DuzenleGenel/>} />
      <Route path='*' element={<Notfound/>} />
    </Routes>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{state: state, dispatch: dispatch}}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
