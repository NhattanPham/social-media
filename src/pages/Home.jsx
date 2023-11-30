import React, { useEffect } from 'react'
import { loadPostsAction, loadPostsScrollAction } from '../store/posts/PostAction'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../components/shared/Post'
import styles from './Home.module.css'
import AddPost from '../components/shared/AddPost'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useState } from 'react'
import { FaUserFriends } from 'react-icons/fa'
import { IoIosSave } from 'react-icons/io'
import { RiGroup2Fill } from 'react-icons/ri'
import { AiFillStar } from 'react-icons/ai'
import Loading from '../components/shared/Loading'

function Home() {
  const { loadding, posts } = useSelector(state => state.posts)
  const { user } = useSelector(state => state.auth)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadPostsAction(1))
    // reloadPostAction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (page !== 1)
      dispatch(loadPostsScrollAction(page))
    // reloadPostAction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  console.log(posts)
  console.log('loadding', isLoading)
  if (loadding)
    return (<Loading isLoading={loadding} />)
  if (isLoading)
    return (<Loading isLoading={isLoading} />)
  return (
    <div className='d-flex'>
      <div className={`${styles.optionUser} col-md-3 d-none d-sm-block`}>
        <div className='d-flex'>
          <img
            style={{ width: '40px', height: '40px', borderRadius: '20px', margin: '0 20px' }}
            src="https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg"
            alt="No found" />
          {user ? user?.name ? <h2>{user?.name}</h2> : <h2>{user?.email}</h2> : <h2>Not Login</h2>}
        </div>
        <ul className={styles.list_option}>
          <li className={styles.list_option_item}><div className='text-primary'>
            <FaUserFriends /> Freinds
          </div></li>
          <li className={styles.list_option_item}><div className='text-danger'>
            <IoIosSave /> Save
          </div></li>
          <li className={styles.list_option_item}><div className='text-info'>
            <RiGroup2Fill /> Groups
          </div></li>
          <li className={styles.list_option_item}><div className='text-warning'>
            <AiFillStar /> Favorites
          </div></li>
        </ul>
      </div>
      <div className='d-flex flex-column col-md-6 align-items-center' align="center">
        <AddPost loadPosts={()=>dispatch(loadPostsAction(1))} page={page} isLoading={setIsLoading} />
        <InfiniteScroll
          dataLength={posts.length} //This is important field to render the next data
          next={() => setPage(page + 1)}
          hasMore={true}
          style={{ overflow: 'hidden' }}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {posts && posts.map(post =>
            <Post key={post.id} post={post} />
          )}
        </InfiniteScroll>
      </div>
      <div className={`${styles.optionUser} col-md-2 d-none d-md-none d-lg-block`}>
        <h3>Online</h3>
        <ul className={styles.list_option}>
          <li className={styles.freind_item}>
            <div className='d-flex'>
          <img
            style={{ width: '40px', height: '40px', borderRadius: '20px', margin: '0 20px' }}
            src="https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg"
            alt="No found" />
          <p>Nhat Tan</p>
        </div>
          </li>
          <li className={styles.freind_item}>
            <div className='d-flex'>
          <img
            style={{ width: '40px', height: '40px', borderRadius: '20px', margin: '0 20px' }}
            src="https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg"
            alt="No found" />
          <p>Quoc Huy</p>
        </div>
          </li>
          <li className={styles.freind_item}>
            <div className='d-flex'>
          <img
            style={{ width: '40px', height: '40px', borderRadius: '20px', margin: '0 20px' }}
            src="https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg"
            alt="No found" />
          <p>Thanh Nhat</p>
        </div>
          </li>
          <li className={styles.freind_item}>
            <div className='d-flex'>
          <img
            style={{ width: '40px', height: '40px', borderRadius: '20px', margin: '0 20px' }}
            src="https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg"
            alt="No found" />
          <p>Quang Phuong</p>
        </div>
          </li>
          <li className={styles.freind_item}>
            <div className='d-flex'>
          <img
            style={{ width: '40px', height: '40px', borderRadius: '20px', margin: '0 20px' }}
            src="https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg"
            alt="No found" />
          <p>Xuan Quang</p>
        </div>
          </li>
          <li className={styles.freind_item}>
            <div className='d-flex'>
          <img
            style={{ width: '40px', height: '40px', borderRadius: '20px', margin: '0 20px' }}
            src="https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg"
            alt="No found" />
          <p>Quang Tuyen</p>
        </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Home