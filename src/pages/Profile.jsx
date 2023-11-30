import React, { useEffect, useState } from 'react'
import styles from './Profile.module.css'
import { useSelector } from 'react-redux'
import { loadPostsByUser } from '../services/posts'
import { getUserById } from '../services/auth'
import { useParams } from "react-router-dom";
import Post from '../components/shared/Post'
import AddPost from '../components/shared/AddPost'
import EditUser from '../components/EditUser'
import Loading from '../components/shared/Loading'

function Profile() {
  const { user } = useSelector(state => state.auth)
  // const { loadding } = useSelector(state => state.posts)
  const [isLoading,setIsLoading] = useState(false)
  const [profile, setProfile] = useState(null)
  const [postsByUser, setPostsByUser] = useState([])
  const { id } = useParams()
  useEffect(() => {
    if (user && user.id === parseInt(id)) {
      handleLoadPosts(user.id)
      setProfile(null)
    } else {
      handleLoadPosts(id)
      getUserById(id)
        .then(res => {
          if (res.status === 200)
            setProfile(res.data)
        })
        .catch(err => console.log(err))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  const handleLoadPosts = (userId) => {
    setIsLoading(true)
    loadPostsByUser(userId)
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false)
          setPostsByUser(res.data)
        }
      })
      .catch(error => console.log(error))
  }
  if(isLoading)
  return (<Loading isLoading={isLoading}/>)
  return (
    <div>
      <div className={styles['avatar_cover_img']}>
        <img
          src="https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2020/09/anh-bia-dep-5-3-696x258.jpg?fit=700%2C20000&quality=95&ssl=1"
          alt="Not Found"
          className={styles.cover_img}
        />
        <div className={styles.avatar}>
          <img
            className={styles.avatar_img}
            src="https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg"
            alt="Not found" />
          {profile && profile ? <div><h2>{profile?.name ? profile.name : profile?.email}</h2></div> : <div><h2>{user?.name ? user.name : user?.email}</h2></div>}
        </div>
      </div>
      <div className='d-flex justify-content-center'>
        <div className={`${styles.intro} col-md-3 d-none d-sm-block`}>
          <h3>Intro</h3>
          <p><b>Address :</b> {profile ? (profile?.address?.city?profile?.address.city:profile?.address?(profile?.address):('Not update')):(user?.address?user?.address:'Not update')}</p>
          <p><b>Phone :</b> {profile ? (profile?.phone?(profile?.phone):'Not update'):(user?.phone?user?.phone:'Not update')}</p>
          {user && user.id === parseInt(id)?<EditUser reloadPosts={handleLoadPosts} />:null}
        </div>
        <div className='d-flex flex-column col-md-6 align-items-center' align="center">
          <AddPost loadPostByUser={() => handleLoadPosts(user.id)} isLoading={setIsLoading}/>
          {postsByUser && postsByUser.map((post) =>
              <Post key={post.id} post={post} loadPosts={()=>handleLoadPosts(user.id)}/>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile