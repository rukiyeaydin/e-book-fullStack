import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './homepage.css'
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs'
import yukle3 from '../../images/yukle3.gif'
import yukle4 from '../../images/yukle4.png'

const Encokokunanlar = () => {
    const [isRightActive, setIsRightActive] = useState(false)
    const [data, setData] = useState([])

    const handleRightArrow = () => {
        setIsRightActive(true);
    }

    const handleLeftArrow = () => {
        setIsRightActive(false);
    }

    useEffect(() => {
        fetch("http://localhost:5000/allbooks", {
          headers:{
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          }
        }).then(res => res.json())
        .then(result => {
            const sortedBooks = result.books.slice().sort((a, b) => b.views - a.views);
            const top10Books = sortedBooks.slice(0, 10);
            // console.log(top10Books)
            setData(top10Books)
        })
    
    },[])
    console.log(data);

    if (data.length === 0 ) {
        return (
        <div className='homepage'>
            <div className="encokokunanlar">
                <p className='encokokunanlarp'>En Çok Okunanlar #10</p>
                <div className="books">
                    <div className="set1">
                        <div className="book">
                            <Link><img src={yukle4} alt="" style={{marginInline:'2px'}} /></Link>
                            <Link><img src={yukle4} alt="" style={{marginInline:'2px'}} /></Link>
                            <Link><img src={yukle4} alt="" style={{marginInline:'2px'}} /></Link>
                            <Link><img src={yukle4} alt="" style={{marginInline:'2px'}} /></Link>
                            <Link><img src={yukle4} alt="" style={{marginInline:'2px'}} /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }


  return (
    <div className='homepage'>
        <div className="encokokunanlar">
            <p className='encokokunanlarp'>En Çok Okunanlar #10</p>
            <div className="books">
                {!isRightActive && (
                <div className="set1">
                    {data.slice(-10,-5).map(item => {
                        return(
                        <div className="book" style={{marginRight:'7px'}} key={item._id}>
                            <Link to={`/kitapinfo/${item._id}`} target='_top'><img src={item.kapakResmi} alt="book" /></Link>
                        </div>
                        )
                    })}
                </div>
                )}
                {isRightActive && (
                <div className="set2">
                    {data.slice(-5).map(item => {
                        return(
                        <div className="book" style={{marginRight:'7px'}} key={item._id}>
                            <Link to={`/kitapinfo/${item._id}`} target='_top'><img src={item.kapakResmi} alt="book" /></Link>
                        </div>
                        )
                    })}
                </div>
                )}
            </div>
            <div className="rl" style={{display:'flex', alignItems:'center', justifyContent: 'center'}}>
                <BsArrowLeftCircle className={`rlicon ${!isRightActive == true ? 'active' : ''}`} onClick={() => handleLeftArrow()} id='leftArrow'/>
                {isRightActive ? <p style={{width:'40px'}}>2 / 2</p> : <p style={{width:'40px'}}>1 / 2</p>}
                <BsArrowRightCircle className={`rlicon ${isRightActive == true ? 'active' : ''}`} onClick={() => handleRightArrow()} id='rightArrow'/>
            </div>
        </div>
    </div>
  )
}

export default Encokokunanlar
