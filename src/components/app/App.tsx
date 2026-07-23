import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import { ProtectedRoute } from '../ProtectedRoute';
import AppHeader from '../AppHeader/AppHeader';
import PostList from '../PostList/PostList';
import type { Post } from '../../services/useServices';
import { PostsContext } from "../context/PostsContext";

export default function App() {
  const [postsList, setPostsList] = useState<Post[]>([]);

  return (
    <PostsContext.Provider value={{ postsList, setPostsList }}>
      <div className="app">
        <AppHeader/>
        <main>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<PostList/>}/>

            <Route element={<ProtectedRoute/>}>
              <Route path="/create" />
            </Route>
          </Routes>
        </main>
      </div>
    </PostsContext.Provider>
    
  );
}