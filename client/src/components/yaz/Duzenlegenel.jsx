import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import yukle2 from '../../images/yukle2.gif'
import { toast } from 'react-toastify';

const Duzenlegenel = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("")
    const [shortDesc, setShortDesc] = useState("")
    const [category, setCategory] = useState("aksiyon")
    const [currentBook, setCurrentBook] = useState(null)

    useEffect(() => {
        fetch("http://localhost:5000/allbooks", {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          }
        })
          .then(res => res.json())
          .then(result => {
            const kitap = result.books.find(item => item._id === id);
            setCurrentBook(kitap);
            setTitle(kitap.title)
            setShortDesc(kitap.shortDesc)
            setCategory(kitap.category)
          });
    }, [id]);

    const editBook = async () => {
        if (id && currentBook !== '') {
          try {
            const response = await fetch(`http://localhost:5000/updateBook/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('jwt'),
              },
              body: JSON.stringify({ title, shortDesc, category }),
            });
      
            const result = await response.json();
            console.log('Güncellenen kitap: ', result.book);
            toast('Kitap güncellendi');
      
          } catch (error) {
            console.error('Hata:', error);
          }
        }
      };


    if (!currentBook) {
        return (
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"70vh"}}>
            <img src={yukle2} alt="" style={{height:"200px",width:"auto"}}/>
        </div>
        );
    }

  return (
    <div>
        <div className='yazhero'>
        <div className="yhcontext">
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
            <button className='yhbuton' onClick={editBook}>Kaydet</button>
        </div>
        </div>
    </div>
  )
}

export default Duzenlegenel
