import React, { useEffect, useState } from 'react'
import Post from '../Components/Post'

function IndexPage() {

  const [posts,setPost] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/post').then(response => {
      response.json().then(posts => {
        setPost(posts);
      });
    });
  },[]);
  return (
    <>
        {posts.length > 0 && posts.map(post => (
          <Post {...post}/>
        ))}
    </>
  )
}

export default IndexPage