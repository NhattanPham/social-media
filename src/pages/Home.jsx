import React, { useEffect, useState } from 'react'
import { loadPostsAction } from '../store/posts/PostAction'
import { checkLikeAction } from '../store/like/LikeAction'
import { useDispatch, useSelector,shallowEqual } from 'react-redux'
import Post from '../components/Post'

function Home() {
  const { loadding, posts, error } = useSelector(state => state.posts,shallowEqual)
  const {likeData} = useSelector(state=>state.like)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadPostsAction())
    dispatch(checkLikeAction())
  }, [])
  useEffect(()=>{ 
  
  },[likeData!==null])
  console.log("Outside",posts)
  console.log("Like data",likeData)
  return (
    <div>
      {posts && posts.map(post=>
      <div key={post.id}>
      {likeData&& <Post  post={post} likes={likeData}/>}
      </div>
      )}
    </div>
  )
}

export default Home