import React, { useEffect ,useState} from 'react'
import { useParams } from 'react-router-dom';

function PostPage() {
    const [postInfo,setPostInfo] = useState(null);
    const {id} = useParams();
    useEffect(() =>{
       
        fetch(`http://localhost:5000/post/${id}`)
          .then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo);
            })
          })
    },[]);

    if(!postInfo) return '';
  return (
    <>
      <img src={`http://localhost:5000/${postInfo.cover}`}></img>
      <h1>{postInfo.title}</h1>
      <p>{postInfo.content}</p>

    </>
  )
}

export default PostPage