import React from 'react'
import Navbar from '../components/Navbar'
import Kategorihero from '../components/kategori/Kategorihero'
import Footer from '../components/Footer'
import Carouselhero from '../components/anasayfa/Carouselhero'

const Kategoriler = () => {
  return (
    <div>
        <Navbar/>
        <Carouselhero />
        <Kategorihero />
        <Footer />
    </div>
  )
}

export default Kategoriler
