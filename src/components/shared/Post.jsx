import React, { useEffect, useState } from 'react'
import styles from './Post.module.css'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { BsChatRightText } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { deletePost } from '../../services/posts'
import { getLikeByuserAndPost, createLike, deleteLike } from '../../services/like'
import { getCommentByPost, createComment } from '../../services/comment'
import { useNavigate, useParams } from 'react-router-dom'
// import {AiOutlineEdit} from 'react-icons/ai'
import {BsTrash} from 'react-icons/bs'
import EditPost from '../EditPost'


function Post({ post,loadPosts }) {
  const [showComment, setShowComment] = useState(false)
  const [comments, setComments] = useState(null)
  const [likeData, setLikeData] = useState(null)
  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const {id} = useParams()
  useEffect(() => {
    if (user) {
      handleLoadPosts()
      if (showComment)
        handleLoadComment()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, showComment])
  const handleLoadPosts = ()=>{
    getLikeByuserAndPost(post.id, user.id)
        .then((res) => {
          if (res.data)
            setLikeData(res.data[0])
        })
        .catch(err => console.log(err))
  }
  const handleLoadComment = () => {
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
  const handleCreateComment = (e) => {
    createComment({ postId: post.id, userId: user?.id, body: e.target.value })
      .then((res) => {
        if (res.data) {
          console.log("res", res.data)
          handleLoadComment()
          e.target.value = ''
          // console.log(comments)
        }
      })
      .catch(err => console.log(err))
  }
  const handleDeletePost = (postId) =>{
    deletePost(postId)
    .then((res)=>{
      if(res.status===200){
        console.log(res.data)
        // handleLoadPosts()
        loadPosts()
      }
    })
  }

  return (
    <div className={`${styles.post} col-md-12 col-xs-12 text-dark`}>
      <div className='d-flex p-2 align-items-center'>
        <img
          src="https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg"
          alt="Not found"
          className={styles.avatar}
        />
        {post.user?.name ? <h3 onClick={() => navigate(`/profile/${post.user.id}`)} style={{ margin: '0 20px', cursor: 'pointer' }}>{post.user?.name}</h3> :
          <h3 onClick={() => navigate(`/profile/${post.user.id}`)} style={{ margin: '0 20px', cursor: 'pointer' }}>{post.user?.email}</h3>}
        {/* <h3 style={{ margin: '0 20px' }}>{post.user.name}</h3> */}
      </div>
      <div className={styles.content}>
        <p className={styles['content_text']}>{post.body}</p>
        {post.thumbnail ?
          <img
            src={post.thumbnail}
            alt="Not found"
            className={styles['content_img']}
          /> :
          <img
            src="https://via.placeholder.com/600/92c952"
            alt="Not found"
            className={styles['content_img']}
          />}
        {/* <img src="https://via.placeholder.com/600/92c952" alt="" className={styles['content_img']}/> */}
      </div>
      <div className={`${styles.action} d-flex justify-content-around`}>
        {likeData ? <div className='btn col-6 text-primary' onClick={() => handleUnLike(likeData?.id)}><AiFillLike /> Like</div>
          : <div className='btn col-6' onClick={() => handleLike(post.id, user.id)}><AiOutlineLike /> Like</div>}
        <div className='btn col-6' onClick={() => setShowComment((v) => !v)}><BsChatRightText /> Comment</div>
      </div>
      {showComment === true ?
        <div className={styles.comment}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Write a comment"
              aria-describedby="basic-addon1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  console.log(e.target.value)
                  handleCreateComment(e)
                }
              }}
            />
          </div>
          {comments && comments.map((comment) =>
            <div key={comment.id} className={styles['comment_item']}>
              <div className='d-flex align-items-center'>
                <img src="https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg"
                  alt="Not found"
                  className={styles['img_comment']}
                />
                {comment.user.name ? <div className='text-primary'>{comment.user.name}</div> :
                  <div className='text-primary'>{comment.user.email}</div>
                }

              </div>
              <div className={styles['body_comment']}>{comment.body}</div>
            </div>
          )}
        </div> : null}
        {user.id===parseInt(id)?<div className={styles.option_post}>
          <ul className={styles.list_option}>
            <li className={styles.list_option_item}><EditPost post={post} loadPosts={loadPosts}/></li>
            <li className={`${styles.list_option_item} btn btn-outline-danger`} onClick={()=>{handleDeletePost(post.id)
            // loadPosts()
            }} ><BsTrash/></li>
          </ul>
        </div>:null}
        
    </div>
  )
}

export default Post