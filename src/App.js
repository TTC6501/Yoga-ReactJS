import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Authenticate from './Auth/Authenticate';
import { Provider } from 'react-redux';
import store from './redux/store'
import Profile from './components/Profile';
import ChangePassword from './components/ChangePassword';


function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Authenticate><Profile /></Authenticate>} />
            <Route path='/password' element={<Authenticate><ChangePassword /></Authenticate>} />
          </Routes>
        </BrowserRouter>
      </Provider>

    </div>
  );
}

export default App;
