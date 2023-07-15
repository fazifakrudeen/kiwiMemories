import React, { useContext, useState } from 'react';
import {Navigate} from 'react-router-dom';
import { UserContext } from '../Components/UserContext';

function LoginPage() {
  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);
  async function login(ev){
    ev.preventDefault();
    const response = await fetch('http://localhost:5000/login' , {
      method:'POST',
      body:JSON.stringify({userName,password}),
      headers:{'Content-Type':'application/json'},
      credentials:'include',
    });
    if(response.ok){
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      })
      
    }else{
      alert("Wrong Credential");
    }
  }

  if(redirect){
    return <Navigate to={'/'} />
  }
  return (
    <>
    
        <form className='login' onSubmit={login}>
            <h1 className='text-center text-4xl font-bold pt-20'>Login</h1>
            <input className='p-1.5 my-9' type='text' placeholder='userName' value={userName} onChange={ev => setUserName(ev.target.value)}/>
            <input className='p-1.5 my-5' type='password' placeholder='password' value={password} onChange={ev => setPassword(ev.target.value)} />
            <div className='flex justify-center'>
            <button className='p-2 rounded-md border border-solid border-gray-300 '>Login</button>
            </div>
            
        </form>
    </>
  )
}

export default LoginPage