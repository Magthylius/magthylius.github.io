import { Routes, Route } from 'react-router-dom';

import Home from '../../Pages/Home';
import TicTacToeGame from '../../Pages/TicTacToe/TicTacToeGame';
import MinesweeperGame from '../../Pages/Minesweeper/MinesweeperGame';

const Main = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/tictactoe' element={<TicTacToeGame />}></Route>
      <Route path='/minesweeper' element={<MinesweeperGame />}></Route>
    </Routes>
  );
}

export default Main;