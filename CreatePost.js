import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
};
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

function CreatePost() {
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [files,setFiles] = useState('');
    const [redirect,setRedirect] = useState(false);

    async function createNewPost(ev){
        const data = new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('file',files[0]);
        ev.preventDefault();
        console.log(files);
        const response = await fetch('http://localhost:5000/post',{
            method:'POST',
            body:data,
            credentials:'include',
        });
        if(response.ok){
            setRedirect(true);
        }
    }
    

    if(redirect){
        return <Navigate to={'/'}/>
    }
  return (
    <>
        <form onSubmit={createNewPost}>
            <input className='p-1.5 my-9'  type='title' placeholder={'title'} value={title} onChange={ev => setTitle(ev.target.value)}></input>
            <input className='p-1.5 my-9'  type='summary' placeholder={'Summary'} value={summary} onChange={ev => setSummary(ev.target.value)}></input>
            <input className='p-1.5 my-9'  type='file' onChange={ev => setFiles(ev.target.files)}></input>
            <ReactQuill className='p-1.5 my-9' value={content} modules={modules} formats={formats} onChange={newValue => setContent(newValue)}></ReactQuill>
            <div className='flex justify-center'>
                <button className='p-2 rounded-md border border-solid border-gray-300 '>POST</button>
            </div>
            

        </form>
    </>
  )
}

export default CreatePost