import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Components/Home'
import UserForm from '../Components/UserForm'
import PostForm from '../Components/PostForm'

const MainRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/users' element={<UserForm/>}/>
        <Route path='/posts' element={<PostForm/>}/>
    </Routes>
  )
}

export default MainRoute