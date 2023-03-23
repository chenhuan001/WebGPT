import './App.css';
import MyChat from '../src/myChat/mychat'
import Login from '../src/login/login'
import 'antd/dist/antd.css';
import React,{useEffect} from 'react';
import { BrowserRouter, Route, link, Routes,Navigate} from "react-router-dom"
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path={"/login"} Component={Login} />
          <Route path={'/home'} Component={MyChat} />
          <Route path='*' element = { <Navigate to='/login' /> }></Route>
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
