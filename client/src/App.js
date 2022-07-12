import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Posts from './components/Posts.jsx'
import NavBar from './components/NavBar.jsx'
import CreatePost from './components/CreatePost.jsx'
import DeletePost from './components/DeletePost.jsx'
import UpdatePost from './components/UpdatePost.jsx'

const App = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Posts/>}></Route>
        <Route path='/psots' element={<Posts/>}></Route>
        <Route path='/create' element={<CreatePost/>}></Route>
        <Route path='/update/:id' element={<UpdatePost/>}></Route>
        <Route path='/delete/:id' element={<DeletePost/>}></Route>
      </Routes>
    </div>
  )
}

export default App