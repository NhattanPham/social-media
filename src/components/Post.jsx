import React, { useEffect, useState } from 'react'
import styles from './Post.module.css'
import { BiLike } from 'react-icons/bi'
import { BsChatRightText } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import {checkLikeAction, createLikeAction, deleteLikeAction } from '../store/like/LikeAction'

function Post({ post,likes }) {
  const [showComment, setShowComment] = useState(false)
  const [likeDataC, setLikeDataC] = useState(null)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    if (user){
      if(likes!==null)
      setLikeDataC(likes.filter(item=> item.userId=== user.id && item.postId === post.id)[0])
    }
  },[])
  //  console.log("Like",likes,post.id)
  const handleLike = (postId, userId) => {
    console.log(postId,userId)
    // setLikeDataC({postId,userId})
    dispatch(createLikeAction({postId, userId}))
    if(likes!==null)
    setLikeDataC(likes.filter(item=> item.userId=== user.id && item.postId === post.id)[0])
    // console.log(post)
    // dispatch(checkLikeAction())
  }
  const handleUnLike = (id) => {
    dispatch(deleteLikeAction(id))
    setLikeDataC(null)
    // dispatch(checkLikeAction())
    
  }
  return (
    <div key={post.id} className={`${styles.post} col-md-6 col-xs-12 text-dark`}>
      <div className='d-flex p-2 align-items-center'>
        <img
          src="https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg"
          alt="Not found"
          className={styles.avatar}
        />
        <h3 style={{ margin: '0 20px' }}>{post.user.name}</h3>
      </div>
      <div className={styles.content}>
        <p>{post.body}</p>
        <img src="https://via.placeholder.com/600/92c952" alt="" />
      </div>
      <div className={`${styles.action} d-flex justify-content-around`}>
        {likeDataC ? <div className='btn col-6 text-primary' onClick={()=>handleUnLike(likeDataC?.id)}><BiLike />Like</div>
         :<div  className='btn col-6' onClick={() => handleLike(post.id, user.id)}><BiLike />Like</div>}
        <div className='btn col-6' onClick={() => setShowComment((v) => !v)}><BsChatRightText />Comment</div>
      </div>
      {showComment === true ?
        <div className={styles.comment}>
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Write a comment" aria-describedby="basic-addon1" />
          </div>
          {post.comments.map((comment) =>
            <div key={comment.id}>{comment.body}</div>
          )}
        </div> : null}

    </div>
  )
}

export default Post