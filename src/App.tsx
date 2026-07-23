import { Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import { ProtectedRoute } from './components/ProtectedRoute';
import AppHeader from './components/appHeader/appHeader';

export default function App() {
  return (
    <div className="app">
      <AppHeader/>
      <main>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" />

          <Route element={<ProtectedRoute/>}>
            <Route path="/create" />
          </Route>
        </Routes>
      </main>
    </div>
  );
}