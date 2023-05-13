import { Routes, Route } from 'react-router-dom';

import Home from '../../Pages/Home';
import TicTacToeGame from '../../Pages/TicTacToeGame';

const Main = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/tictactoe' element={<TicTacToeGame />}></Route>
    </Routes>
  );
}

export default Main;