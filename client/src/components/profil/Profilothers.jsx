import React,{useEffect,useState,useContext} from 'react'
import { UserContext } from '../../App'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Profilkitaplar from './Profilkitaplar'
import Profiltakipciler from './Profiltakipciler'
import Profiltakipedilenler from './Profiltakipedilenler'
import { MdPersonAddAlt1 } from 'react-icons/md'
import { BsPersonCheckFill } from "react-icons/bs"
import './profilhero.css'

const Profilothers = () => {
  const [userProfile,setUserProfile] = useState(null)
  const {state,dispatch} = useContext(UserContext)
  const navigate = useNavigate()
  const { username } = useParams()
  const [activeTab, setActiveTab] = useState('kitaplar')
  const [data, setData] = useState([])
  const [myBooks, setMyBooks] = useState([])
  const [showfollow, setShowFollow] = useState(state && userProfile && userProfile.user ? !state.following.includes(userProfile.user._id):true)

  if(state && state.username === username){
    console.log(true)
    navigate(`/profilim/${state.username}`)
  }
  
  useEffect(() => {
    if (userProfile && state && userProfile.user) {
      setShowFollow(!state.following.includes(userProfile.user._id));
    }
  }, [userProfile, state]);

  useEffect(() => {
    fetch(`http://localhost:5000/profil/${username}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
    })
    .then(res => res.json())
    .then(result => {
      // console.log(result)
      setUserProfile(result)
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
  }, [username]);

  // console.log(userProfile)

  useEffect(() => {
    fetch("http://localhost:5000/allbooks", {
      headers:{
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
    .then(result => {
      // console.log(result)
      setData(result.books)
    })
  },[])
  
  useEffect(() => {
    if (data.length > 0) {
      const userBooks = data.filter(item => item.author.username === username)
      if (userBooks.length > 0) {
        setMyBooks(userBooks);
        // console.log(myBooks)
      }
    }
  }, [data, state]);

  const userId = userProfile && userProfile.user._id

  const followUser = () => {
    fetch('http://localhost:5000/follow', {
      method: "put",
      headers:{
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        followId: userId,
      })
    }).then(res => res.json())
    .then(data => {
      // console.log(data)
      dispatch({type:"UPDATE", payload:{following:data.following, followers: data.followers}})
      localStorage.setItem("user", JSON.stringify(data))
      setUserProfile(prevState => {
        return {
          ...prevState,
          user: {
            ...prevState.user,
            followers: [...prevState.user.followers, data._id]
          }
        }
      })
      setShowFollow(false)
    })
  }

  const unfollowUser = () => {
    fetch('http://localhost:5000/unfollow', {
      method: "put",
      headers:{
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        unfollowId: userId
      })
    }).then(res => res.json())
    .then(data => {
      // console.log(data)
      dispatch({type:"UPDATE", payload:{following:data.following, followers: data.followers}})
      localStorage.setItem("user", JSON.stringify(data))
      setUserProfile(prevState => {
        const newFollower = prevState.user.followers.filter(item => item !== data._id)
        return {
          ...prevState,
          user: {
            ...prevState.user,
            followers: newFollower
          }
        }
      })
      setShowFollow(true)
    })
  }


  // console.log(userProfile.user._id)

  // const isFollowing = userProfile && userProfile.user && userProfile.user.followers && userProfile.user.followers.some(kullanici => kullanici._id === state._id);

  return (
    <div>
        <div className="phust">
            <img src={ userProfile ? userProfile.user.profilResmi : "https://arayorum.com/images/profilbg.jpg"} alt="profil resmi" className='phaurora'/>
            <p className='phustisim'>{ userProfile ? userProfile.user.name : "loading..."}</p>
            <p className='phusername'>@{userProfile ? userProfile.user.username : "loading..."}</p>
            <div className="phistatistik">
                <div className="phwork">
                    <p>Kitap sayısı</p>
                    <p>{myBooks.length}</p>
                </div>
                <div className="phwork">
                    <p>Takipçiler</p>
                    <p>{userProfile ? userProfile.user.followers.length : "-"}</p>
                </div>
                <div className="phtakipci">
                    <p>Takip Edilenler</p>
                    <p>{userProfile ? userProfile.user.following.length : "-"}</p>
                </div>
            </div>

            <div>
              {showfollow ? 
              <button className="phbuton" onClick={() => followUser()}>
                <MdPersonAddAlt1 style={{marginRight:'5px'}}/>Takip et
              </button>
              : 
              <button className="phbuton active" onClick={() => unfollowUser()}>
                <BsPersonCheckFill style={{marginRight:'5px'}}/>Takip Ediliyor
              </button>
              }
            </div>

        </div>

        <div className="phorta">
            <Link className={activeTab === 'kitaplar' ? 'kitaplarLink active' : 'kitaplarLink'} onClick={() => setActiveTab('kitaplar')}>Kitaplar</Link>
            <Link className={activeTab === 'takipciler' ? 'takipcilerLink active' : 'takipcilerLink'} onClick={() => setActiveTab('takipciler')}>Takipçiler</Link>
            <Link className={activeTab === 'takipEdilenler' ? 'takipedilenlerLink active' : 'takipedilenlerLink'} onClick={() => setActiveTab('takipEdilenler')}>Takip Edilenler</Link>
        </div>
        <div className='phaltfull'>
            {activeTab === "kitaplar" && <Profilkitaplar/>}
            {activeTab === "takipciler" && <Profiltakipciler />}
            {activeTab === "takipEdilenler" && <Profiltakipedilenler />}
        </div>
    </div>
  )
}

export default Profilothers
