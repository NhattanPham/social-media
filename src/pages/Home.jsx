import React, { useEffect } from 'react'
import { loadPostsAction } from '../store/posts/PostAction'
import { useDispatch, useSelector,shallowEqual } from 'react-redux'
import Post from '../components/Post'

function Home() {
  const { posts } = useSelector(state => state.posts,shallowEqual)
  // const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadPostsAction())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='d-flex flex-column'  align="center">
      {posts && posts.map(post=>
      <div key={post.id}>
      <Post  post={post} />
      </div>
      )}
    </div>
  )
}

export default Home