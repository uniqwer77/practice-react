import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import { ProtectedRoute } from '../ProtectedRoute';
import AppHeader from '../AppHeader/AppHeader';
import PostList from '../PostList/PostList';
import CreatePost from '../CreatePost/CreatePost';
import PostItem from '../PostItem/PostItem';

export default function App() {
  return (
    <div className="app">
      <AppHeader/>
      <main>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<PostList/>}/>
          <Route path='/post/:id' element={<PostItem/>}/>

          <Route element={<ProtectedRoute/>}>
            <Route path="/create" element={<CreatePost/>}/>
          </Route>
        </Routes>
      </main>
    </div>    
  );
}