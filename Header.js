import React, { useContext, useEffect, useState } from 'react'
import { Link, json } from 'react-router-dom'
import { UserContext } from './UserContext';

function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:5000/profile',{
      credentials:'include',
    }).then(response => {
      response.json().then(userInfo => {
          setUserInfo(userInfo);
      });
    });
  },[]);
  function logout(){
    fetch('http://localhost:5000/logout',{
      credentials:'include',
      method:'POST'
    })
    setUserInfo(null);
  }
  const userName = userInfo?.userName;
  return (
    <header>
    <Link to="/" className="logo"> Kiwi Blogs</Link>
    <nav>
    {userName && (
      <>
        <Link to="/create">Create new Post</Link>
        <a onClick={logout}>LogOut</a>
      </>
    )}
    {!userName && (
      <>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      </>
    )}
      
    </nav>
  </header>
  )
}

export default Header