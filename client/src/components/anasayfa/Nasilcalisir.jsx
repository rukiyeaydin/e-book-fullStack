import React from 'react'
import './nasilcalisir.css'

const Nasilcalisir = () => {
  return (
    <div className='nasilcalisir'>
      <p className='nasilcalisirfirst'>RKM Nasıl Çalışır?</p>
      <br />
      <p className='adimsagptwo'>Topluluğun gücü ve RKM'nin teknolojisiyle hikayenizin keşfedilmesini sağlayın.</p>
      <br /><br />
      <div className="adimlar">
        <div className="adim">
            <p className='adimp'>1</p>
            <div className="adimsag">
                <p className='adimsagp'>Oluşturun</p>
                <p className='adimsagptwo'>Eşsiz sesinizi ve orijinal hikayenizi RKM'de paylaşın. Sadece sizin anlatabileceğiniz bir hikayeyi oluştururken ihtiyaç duyduğunuz yazma kaynaklarını bulun.</p>
            </div>
        </div>
        <div className="adim">
            <p className='adimp'>2</p>
            <div className="adimsag">
                <p className='adimsagp'>İnşa Edin</p>
                <p className='adimsagptwo'>Hikayeniz okur ve momentum kazanırken küresel bir hayran kitlesi kurun. Hikaye anlatıcılığı aracılığıyla sizinle aynı fikirde olan yazarlarla bağlantı kurun.</p>
            </div>
        </div>
        <div className="adim">
            <p className='adimp'>3</p>
            <div className="adimsag">
                <p className='adimsagp'>Artırın</p>
                <p className='adimsagptwo'>RKM Star statüsünü kazanın ve hikayeniz RKM Books ve RKM Stüdyoları aracılığıyla basılsın ya da filme veya televizyon dizisine uyarlansın!</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Nasilcalisir
