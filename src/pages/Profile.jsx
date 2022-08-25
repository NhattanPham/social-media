import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Profile() {
  const {user} = useSelector(state=>state.auth)
  // const dispatch = useDispatch()
  return (
    <div>
      <div className='d-flex'>
        <img src="https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg" alt="" />
        <div>{user.name?user.name:user.email}</div>
      </div>
    </div>
  )
}

export default Profile