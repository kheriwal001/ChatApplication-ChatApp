import React, { useContext, useEffect,useState } from 'react'
import './RightSidebar.css'
import assets from '../../assets/assets'
import { logout } from '../../config/firebase'
import { AppContext } from '../../context/AppContext'

const RightSidebar = () => {

  const { chatUser,messages } = useContext(AppContext);
  
  return chatUser  ? (
    <div className='rs'>
      <div className='rs-profile'>
       
        <h3>{Date.now() - chatUser.userData.lastSeen <= 70000 ?<img className='dot' src={assets.green_dot} alt=''/>:null}{chatUser.userData.name}</h3>
        <p>{chatUser.userData.bio}</p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Media</p>
        
      </div>
      <button onClick={()=>logout()}>Logout</button>
    </div>
  ) : <div className='rs'>
    <button onClick={()=>logout()}>Logout</button>
  </div>
}

export default RightSidebar
