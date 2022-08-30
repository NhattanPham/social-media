import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NavigationBar from './components/NavigationBar';
import Profile from './pages/Profile';
// import {useSelector} from 'react-redux'

function App() {
  // const {user} = useSelector(state=>state.auth);
  return (
    <div>
      <NavigationBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile/:id' element={<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;
