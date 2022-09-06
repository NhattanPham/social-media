import React, { useEffect, useState } from 'react'
import styles from './Profile.module.css'
import { useSelector } from 'react-redux'
import Post from '../components/Post'
import { loadPostsByUser } from '../services/posts'
import { getUserById } from '../services/auth'
import { useParams } from "react-router-dom";
import AddPost from '../components/AddPost'
import EditUser from '../components/EditUser'
import LazyLoad from 'react-lazy-load'

function Profile() {
  const { user } = useSelector(state => state.auth)
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
    loadPostsByUser(userId)
      .then((res) => {
        if (res.status === 200) {
          setPostsByUser(res.data)
        }
      })
      .catch(error => console.log(error))
  }

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
        <div className={`${styles.intro} col-md-3`}>
          <h3>Intro</h3>
          <p>Address</p>
          <EditUser reloadPosts={handleLoadPosts} />

        </div>
        <div className='d-flex flex-column col-md-6 align-items-center' align="center">
          <AddPost loadPostByUser={() => handleLoadPosts(user.id)} />
          {postsByUser && postsByUser.map((post) =>
            <LazyLoad
              key={post.id}
              offset={300}
              height={700}
              width={'100%'}
              onContentVisible={() => console.log('Loadding')}
            >
              <Post key={post.id} post={post} />
            </LazyLoad>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile