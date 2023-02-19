import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Autorization from './pages/Authorization';
import RoomsTablePage from './pages/RoomsTablePage'
import SingleRoomPage from './pages/SingleRoomPage';

function App() {

  return (
    <Routes>

      <Route path='/'
        element={<RoomsTablePage /> }
      />

      <Route path='/login'
        element={<Autorization />}
      />

      <Route path='/rooms/:roomId'
        element={<SingleRoomPage/>}
      />


    </Routes>

  );
}

export default App;
