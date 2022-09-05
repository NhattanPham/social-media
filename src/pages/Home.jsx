import React, { useEffect } from 'react'
import { loadPostsAction } from '../store/posts/PostAction'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../components/Post'
import styles from './Home.module.css'
import AddPost from '../components/AddPost'

function Home() {
  const { posts } = useSelector(state => state.posts)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadPostsAction())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='d-flex'>
      <div className={`${styles.optionUser} col-md-3`}>
        <div className='d-flex'>
        <img
          style={{ width: '40px', height: '40px', borderRadius: '20px', margin: '0 20px' }}
          src="https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg"
          alt="No found" />
          {user ? user?.name?<h2>{user?.name}</h2>:<h2>{user?.email}</h2>:<h2>Not Login</h2>}
          </div>
          <p>Friends</p>
          <p>Save</p>
      </div>
      <div className='d-flex flex-column col-md-6 align-items-center' align="center">
        <AddPost/>
        {posts && posts.map(post =>
          <Post key={post.id} post={post} />
        )}
      </div>
    </div>
  )
}

export default Home