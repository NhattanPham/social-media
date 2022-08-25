import React, { useEffect } from 'react'
import styles from './Home.module.css'
import { BiLike } from 'react-icons/bi'
import { BsChatRightText } from 'react-icons/bs'
import { loadPostsAction } from '../store/posts/PostAction'
import { useDispatch, useSelector } from 'react-redux'

function Home() {
  const { loadding, posts, error } = useSelector(state => state.posts)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadPostsAction())
  }, [])
  console.log(posts)
  return (
    <div>
      {posts && posts.map(post=>
        <div className={`${styles.post} col-md-6 col-xs-12 text-dark`}>
        <div className='d-flex p-2 align-items-center'>
          <img
            src="https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg"
            alt="Not found"
            className={styles.avatar}
          />
          <h3>{post.user.name}</h3>
        </div>
        <div className={styles.content}>
        <p>{post.body}</p>
        <img src="https://via.placeholder.com/600/92c952" alt="" />
        </div>
        <div className={`${styles.action} d-flex justify-content-around`}>
          <div className='btn col-6'><BiLike />Like</div>
          <div className='btn col-6'><BsChatRightText />Comment</div>
        </div>
      </div>)}
    </div>
  )
}

export default Home