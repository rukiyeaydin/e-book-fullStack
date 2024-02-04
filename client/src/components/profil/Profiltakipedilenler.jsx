import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MdPersonAddAlt1 } from 'react-icons/md'
import { BsFillPersonCheckFill } from 'react-icons/bs'
import { UserContext } from '../../App'
import Yukleniyorc from '../Yukleniyorc'

const Profiltakipedilenler = () => {
  const {state,dispatch} = useContext(UserContext)
  const [followingList, setFollowingList] = useState([]);
  const { username } = useParams()
  const [user, setUser] = useState([])

  useEffect(() => {
      fetch(`http://localhost:5000/profil/${username}`, {
          headers: {
              "Authorization": "Bearer " + localStorage.getItem("jwt")
          },
      })
      .then(res => res.json())
      .then(result => {
        setUser(result)
        if (result && result.user && result.user.following) {
          setFollowingList(result.user.following);
        }
      })
      .catch(error => {
          console.error("Fetch error:", error);
      });
    }, [username]);

  // console.log(followingList)



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
      setFollowingList(prevFollowersList => prevFollowersList.map(follower => {
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
      setFollowingList(prevFollowersList => prevFollowersList.map(follower => {
        if (follower._id === userId) {
          return { ...follower, followers: follower.followers.filter(f => f !== state._id) };
        }
        return follower;
      }));
    })
  }

  if (user.length === 0) {
    return (
      <div style={{height:"40vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Yukleniyorc />
      </div>
    );
  }

  if (followingList.length === 0) {
    return (
      <div className="" style={{height:"40vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <p>Takip edilen yok.</p>
      </div>
    );
  }

  return (
    <div className="phaltsec">
        <h3 style={{borderBottom:'1px solid black'}}>Takip Edilenler</h3>
        <div className="profiller">
            {followingList.map((following, index) => {
                return(
                <div className="profil" key={index}>
                  <img src={following.profilResmi} alt="profil-resmi" className='profil-resmi'/>
                  <div className="profil-bilgi">
                      <p>{following.name}</p>
                      <Link to={`/profil/${following.username}`} className='profilusername'>{following.username}</Link>
                  </div>

                  {state && following && following._id === state._id ?
                    <button className="profilbuton" style={{opacity: "0", zIndex:"-100"}}>
                      <BsFillPersonCheckFill style={{marginRight:'5px'}}/>
                    </button>
                  : 
                    <button className={following.followers && following.followers.includes(state._id) ? "profilbuton active" : "profilbuton"}>
                      {following.followers && following.followers.includes(state._id) ? 
                          <BsFillPersonCheckFill style={{marginRight:'5px'}} onClick={() => unfollowUser(following && following._id)} />
                          : 
                          <MdPersonAddAlt1 style={{marginRight:'5px'}} onClick={() => followUser(following && following._id)} />
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

export default Profiltakipedilenler
