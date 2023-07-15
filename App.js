import './app.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Post from './Components/Post';
import Header from './Components/Header';
import { Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import { UserContextProvider } from './Components/UserContext';
import CreatePost from './Pages/CreatePost';
import PostPage from './Pages/PostPage';

function App() {
  return (

    <UserContextProvider>
      <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPage />}/>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/create' element={<CreatePost /> }/>
        <Route path='/post/:id' element={<PostPage/>} />
      </Route>
    </Routes>
    </UserContextProvider>
  
    
    
   
  );
}

export default App;
