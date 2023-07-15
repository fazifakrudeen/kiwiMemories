import React, { useState } from 'react'

function RegisterPage() {
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');

    async function  register(ev){
        ev.preventDefault();
        const response = await fetch('http://localhost:5000/register' , {
            method:'POST',
            body:JSON.stringify({userName,password}),
            headers:{'Content-Type': 'application/json'},
        })
        if(response.status === 200){
            alert("Registration Successful");
        }else{
            alert("Registration Failed");
        }
    }
  return (
    <>
    <form onSubmit={register}>
            <h1 className='text-center text-4xl font-bold pt-20'>Register</h1>
            <input className='p-1.5 my-9' type='text' placeholder='userName' value={userName} onChange={ev => setUserName(ev.target.value)}/>
            <input className='p-1.5 my-5' type='password' placeholder='password' value={password} onChange={ev => setPassword(ev.target.value)} />
            <div className='flex justify-center'>
            <button className='p-2 rounded-md border border-solid border-gray-300 '>Register</button>
            </div>
    </form>
    </>
  )
}

export default RegisterPage