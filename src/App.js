import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NavigationBar from './components/NavigationBar';
import Profile from './pages/Profile';
import ScrollToTop from './components/shared/ScrollToTop';
import ProtectedRoute from './components/shared/ProtectedRoute';
import {useSelector} from 'react-redux'

function App() {
  const {user} = useSelector(state=>state.auth);
  return (
    <div>
      <NavigationBar />
      <ScrollToTop>
        <Routes>
          <Route path='/' element={<ProtectedRoute condition={user}>
            <Home/>
          </ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile/:id' element={<Profile />} />
        </Routes>
      </ScrollToTop>
    </div>
  );
}

export default App;
