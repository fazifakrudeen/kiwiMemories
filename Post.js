import React from 'react';
import ReactDOM from 'react-dom/client';
import {format} from "date-fns";
import { Link } from 'react-router-dom';

export default function Post({_id,title,summary,cover,content,createdAt,author}){
    return (
      
      
      <div className='post' >
        <div className='image'>
        <Link to={`/post/${_id}`}>
        <img src={'http://localhost:5000/'+cover}></img>
        </Link>
        
        </div>
        <div className="text">
        <Link to={`/post/${_id}`}>
        <h2>{title}</h2>
        </Link>
          
          <p className='info'>
          <a className='author'>{author.userName}</a>
          <time>{format(new Date(createdAt),'MMM d, yyyy HH:mm')}</time>
          </p>
          <p className='summary'>{summary}</p>
        </div>
        

</div>
    )
}