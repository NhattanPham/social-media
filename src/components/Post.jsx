import React, { useEffect, useState } from 'react'
import styles from './Post.module.css'
import { AiFillLike,AiOutlineLike } from 'react-icons/ai'
import { BsChatRightText } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { getLikeByuserAndPost, createLike, deleteLike } from '../services/like'
import { getCommentByPost, createComment } from '../services/comment'

function Post({ post }) {
  const [showComment, setShowComment] = useState(false)
  const [comments, setComments] = useState(null)
  const [likeData, setLikeData] = useState(null)
  const { user } = useSelector(state => state.auth)
  useEffect(() => {
    if (user) {
      getLikeByuserAndPost(post.id, user.id)
        .then((res) => {
          if (res.data)
            setLikeData(res.data[0])
        })
        .catch(err => console.log(err))
      if (showComment)
      handleLoadComment()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, showComment])
  const handleLoadComment = ()=>{
      getCommentByPost(post.id)
          .then((res) => {
            if (res.data)
              setComments(res.data)
          })
          .catch(err => console.log(err))
  }
  const handleLike = (postId, userId) => {
    createLike({ postId, userId })
      .then((res) => {
        if (res.data)
          setLikeData(res.data)
      })
      .catch(err => console.log(err))
  }
  const handleUnLike = (id) => {
    deleteLike(id)
      .then((res) => {
        if (res.data)
          setLikeData(null)
      })
      .catch(err => console.log(err))
  }
  const handleCreateComment = (e) =>{
    createComment({postId:post.id,userId:user?.id,body:e.target.value})
    .then((res)=>{
      if(res.data){
        console.log("res",res.data)
        handleLoadComment()
      e.target.value=''
      // console.log(comments)
    }
    })
    .catch(err => console.log(err))
  }
  console.log('like data', likeData)
  console.log('Comments',comments)
  return (
    <div className={`${styles.post} col-md-12 col-xs-12 text-dark`}>
      <div className='d-flex p-2 align-items-center'>
        <img
          src="https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg"
          alt="Not found"
          className={styles.avatar}
        />
        {post.user?.name?<h3 style={{ margin: '0 20px' }}>{post.user?.name}</h3>:
        <h3 style={{ margin: '0 20px' }}>{post.user?.email}</h3>}
        {/* <h3 style={{ margin: '0 20px' }}>{post.user.name}</h3> */}
      </div>
      <div className={styles.content}>
        <p className={styles['content_text']}>{post.body}</p>
        <img src="https://via.placeholder.com/600/92c952" alt="" className={styles['content_img']}/>
      </div>
      <div className={`${styles.action} d-flex justify-content-around`}>
        {likeData ? <div className='btn col-6 text-primary' onClick={() => handleUnLike(likeData?.id)}><AiFillLike />Like</div>
          : <div className='btn col-6' onClick={() => handleLike(post.id, user.id)}><AiOutlineLike />Like</div>}
        <div className='btn col-6' onClick={() => setShowComment((v) => !v)}><BsChatRightText />Comment</div>
      </div>
      {showComment === true ?
        <div className={styles.comment}>
          <div className="input-group mb-3">
            <input 
            type="text" 
            className="form-control"
            placeholder="Write a comment" 
            aria-describedby="basic-addon1"
            onKeyDown={(e)=>{
              if(e.key === 'Enter'){
                console.log(e.target.value)
                handleCreateComment(e)
              }
            }}
            />
          </div>
          {comments&&comments.map((comment) =>
            <div key={comment.id} className={styles['comment_item']}>
              <div className='d-flex align-items-center'>
                <img src="https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg"
                  alt="Not found" 
                  className={styles['img_comment']}
                  />
                {comment.user.name?<div className='text-primary'>{comment.user.name}</div>:
                <div className='text-primary'>{comment.user.email}</div>
                }
                
              </div>
              <div className={styles['body_comment']}>{comment.body}</div>
            </div>
          )}
        </div> : null}

    </div>
  )
}

export default Post