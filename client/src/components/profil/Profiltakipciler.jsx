import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MdPersonAddAlt1 } from 'react-icons/md'
import { BsFillPersonCheckFill } from 'react-icons/bs'
import { UserContext } from '../../App'
import Yukleniyorc from '../Yukleniyorc'

const Profiltakipciler = () => {
    
  const {state,dispatch} = useContext(UserContext)
  const [followersList, setFollowersList] = useState([]);
  const { username } = useParams()
  const [user, setUser] = useState([])

  if (!followersList) {
    return (
      <div style={{height:"40vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Yukleniyorc />
      </div>
    );
  }


  useEffect(() => {
      fetch(`http://localhost:5000/profil/${username}`, {
          headers: {
              "Authorization": "Bearer " + localStorage.getItem("jwt")
          },
      })
      .then(res => res.json())
      .then(result => {
        // console.log(result)
        setUser(result)
        if (result && result.user && result.user.followers) {
          setFollowersList(result.user.followers);
        }
      })
      .catch(error => {
          console.error("Fetch error:", error);
      });
    }, [username]);



    const followUser = (userId) => {
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
        // localstorage'daki islemden sonra butonların anında değişmesi için setFollowerList'i güncellemen gerekir
        setFollowersList(prevFollowersList => prevFollowersList.map(follower => {
          if (follower._id === userId) {
            return { ...follower, followers: [...follower.followers, state._id] };
          }
          return follower;
        }));
      })
    }



    const unfollowUser = (userId) => {
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
        setFollowersList(prevFollowersList => prevFollowersList.map(follower => {
          if (follower._id === userId) {
            return { ...follower, followers: follower.followers.filter(f => f !== state._id) };
          }
          return follower;
        }));
      })
    }

    // console.log(user)
    if (user.length === 0) {
      return (
        <div style={{height:"40vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
          <Yukleniyorc />
        </div>
      );
    }

    if (followersList.length === 0) {
      return (
        <div className="" style={{height:"40vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
          <p>Takipçi yok.</p>
        </div>
      );
    }

  return (
    <div className="phaltsec">
        <h3 style={{borderBottom:'1px solid black'}}>Takipçiler</h3>
        <div className="profiller">
            {followersList.map((follower, index) => {
                return(
                <div className="profil" key={index}>
                    <img src={follower.profilResmi} alt="profil-resmi" className='profil-resmi'/>
                    <div className="profil-bilgi">
                        <p>{follower.name}</p>
                        <Link to={`/profil/${follower.username}`}  className='profilusername'>{follower.username}</Link>
                    </div>

                    {state && follower && follower._id === state._id ? 
                      <button className="profilbuton" style={{opacity: "0", zIndex:"-100"}}>
                            <BsFillPersonCheckFill style={{marginRight:'5px'}}/>
                      </button>
                    : 
                    <button className={follower.followers && follower.followers.includes(state._id) ? "profilbuton active" : "profilbuton"}>
                      {follower.followers && follower.followers.includes(state._id) ? 
                          <BsFillPersonCheckFill style={{marginRight:'5px'}} onClick={() => unfollowUser(follower && follower._id)} />
                          : 
                          <MdPersonAddAlt1 style={{marginRight:'5px'}} onClick={() => followUser(follower && follower._id)} />
                      }
                    </button>
                    }

                </div>
                )
            })}

        </div>
    </div>
  )
}

export default Profiltakipciler
