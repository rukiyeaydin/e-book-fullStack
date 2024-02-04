import React from 'react'
import Navbar from '../components/Navbar'
import Encokokunanlar from '../components/anasayfa/Encokokunanlar'
import Footer from '../components/Footer'
import Okumayabasla from '../components/anasayfa/Okumayabasla'
import Favoriler from '../components/anasayfa/Favoriler'
import Soncikanlar from '../components/anasayfa/Soncikanlar'

const Anasayfa = () => {
  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
      <Navbar />
      <Encokokunanlar />
      <Favoriler />
      <Soncikanlar />
      <Okumayabasla />
      <Footer />
    </div>
  )
}

export default Anasayfa
