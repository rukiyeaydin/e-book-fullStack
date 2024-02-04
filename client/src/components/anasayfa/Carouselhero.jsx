import React, { useState } from 'react';
import './carousel.css';
import cr1 from '../../images/carouselImages/cr1.png';
import cr2 from '../../images/carouselImages/cr2.png';
import cr3 from '../../images/carouselImages/cr3.png';
import cr4 from '../../images/carouselImages/cr4.png';
import cr5 from '../../images/carouselImages/cr5.png';
import cr6 from '../../images/carouselImages/cr6.png';

const Carouselhero = () => {
  const [activeImage, setActiveImage] = useState(cr1);
  const [activeButton, setActiveButton] = useState('disc1'); // Başlangıçta cr1 düğmesi aktif

  const handleCarousel = (image, buttonClass) => {
    setActiveImage(image);
    setActiveButton(buttonClass);
  }

  return (
    <div className="carousel">
      <img src={activeImage} alt="carousel image" className='carouselimg'/>
      <div className="discs">
        <button className={`disc1 ${activeButton === 'disc1' ? 'active' : ''}`} onClick={() => handleCarousel(cr1, 'disc1')}></button>
        <button className={`disc2 ${activeButton === 'disc2' ? 'active' : ''}`} onClick={() => handleCarousel(cr2, 'disc2')}></button>
        <button className={`disc3 ${activeButton === 'disc3' ? 'active' : ''}`} onClick={() => handleCarousel(cr3, 'disc3')}></button>
        <button className={`disc4 ${activeButton === 'disc4' ? 'active' : ''}`} onClick={() => handleCarousel(cr4, 'disc4')}></button>
        <button className={`disc5 ${activeButton === 'disc5' ? 'active' : ''}`} onClick={() => handleCarousel(cr5, 'disc5')}></button>
        <button className={`disc6 ${activeButton === 'disc6' ? 'active' : ''}`} onClick={() => handleCarousel(cr6, 'disc6')}></button>
      </div>
    </div>
  )
}

export default Carouselhero;
