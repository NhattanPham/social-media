import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Post from '../components/Post'
import { loadPostsByUser,createPost } from '../services/posts'
import styles from './Profile.module.css'

function Profile() {
  const { user } = useSelector(state => state.auth)
  const [postsByUser, setPostsByUser] = useState([])
  useEffect(() => {
    if (user) {
      handleLoadPosts(user.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleLoadPosts = (userId)=>{
    loadPostsByUser(userId)
        .then((res) => {
          if (res.status === 200) {
            setPostsByUser(res.data)
          }
        })
        .catch(error=>console.log(error))
  }
  const handleAddPost = (e) => {
    createPost({ userId: user.id, body: e.target.value })
    handleLoadPosts(user.id)
    e.target.value = ''

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
          <div><h2>{user.name ? user.name : user.email}</h2></div>
        </div>
      </div>
      <div className='d-flex justify-content-center'>
        <div className={`${styles.intro} col-md-3`}>
          <h3>Intro</h3>
          <p>Address</p>
        </div>
        <div className='d-flex flex-column'>
          <div style={{ backgroundColor: 'rgb(247, 247, 247)', margin: '10px 0', padding: '10px 20px',borderRadius:'20px' }} className='col-md-12'>
            <div className='input-group mb-3'>
              <img
                style={{ width: '40px', height: '40px', borderRadius: '20px', margin: '0 20px' }}
                src="https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg"
                alt="No found" />
              <input
                type="text"
                className="form-control"
                placeholder={`What's on your mind?`}
                aria-describedby="basic-addon1"
              onKeyDown={(e)=>{
                if(e.key === 'Enter'){
                  console.log(e.target.value)
                  handleAddPost(e)
                }
              }}
              />
            </div>
          </div>
          {postsByUser && postsByUser.map((post) =>
            <Post key={post.id} post={post} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile