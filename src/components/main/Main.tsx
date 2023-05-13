import { Routes, Route } from 'react-router-dom';

import Home from '../../pages/Home';
import TicTacToeGame from '../../pages/TicTacToeGame';

const Main = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/tictactoe' element={<TicTacToeGame />}></Route>
    </Routes>
  );
}

export default Main;