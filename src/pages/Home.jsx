import React, { useEffect } from 'react'
import { loadPostsAction, createPostAction } from '../store/posts/PostAction'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../components/Post'
import styles from './Home.module.css'

function Home() {
  const { posts } = useSelector(state => state.posts)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadPostsAction())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleAddPost = (e) => {
    dispatch(createPostAction({ userId: user.id, body: e.target.value }))
    dispatch(loadPostsAction())
    e.target.value = ''

  }
  console.log(posts)
  return (
    <div className='d-flex'>
      <div className={`${styles.navigationBar} col-md-3`}>
        <div className='d-flex'>
        <img
          style={{ width: '40px', height: '40px', borderRadius: '20px', margin: '0 20px' }}
          src="https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg"
          alt="No found" />
          <h2>User Name</h2>
          </div>
          <p>Friends</p>
          <p>Save</p>
      </div>
      <div className='d-flex flex-column col-md-6 align-items-center' align="center">
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
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  console.log(e.target.value)
                  handleAddPost(e)
                }
              }}
            />
          </div>
        </div>
        {posts && posts.map(post =>
          <Post key={post.id} post={post} />
        )}
      </div>
    </div>
  )
}

export default Home