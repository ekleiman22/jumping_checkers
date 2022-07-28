
/*import './stylesheets/mycss.css'*/
import { glob } from './Global'
import { useSelector, useDispatch } from 'react-redux'

import Checker_click_handler from './mouseHandler'
import Undo_click_handler from './undoMouseHandler'
import Show_Solution_click_handler from './showSolutionMouseHandler'
import DrawManager from './DrawManager'

 function GameField() {
    //It works after createSlice , so array of checkers should be created
    //draw field as a rectangle in canvas and draw checkers in initial state
    let g = glob();
    var c = document.getElementById(g.canvasId);
    //var heightRatio = 1.5;
    //c.height = c.width * heightRatio;
    //let tbl1 = document.getElementById("tbl1");
    //let offsetLeft = tbl1.offsetLeft;
    let leftFieldgamePos = g.leftFieldgamePos;
    let cellsCount = Number(g.cellsCount);
   


    const dispatch = useDispatch();
     const checkers = useSelector(state => state.game.checkers);
     const moves = useSelector(state => state.game.moves);
     //GameField is rendered twice so we need avoid to add additional event listeners
     if (moves.length > 0)
         return;

     let drawman = new DrawManager();
     drawman.drawGameField();
    for (var i = 0; i < cellsCount; i++) {
        let checker = checkers[i];
        let doClick = (event) => Checker_click_handler(dispatch, event, checker.cellId,
            checker.centerX, checker.centerY, checker.checkerRadius, c);
        c.addEventListener('mousedown', doClick);
    }
    let btnUndo = document.getElementById("btnUndo");   
    let undoClick = (event)=> Undo_click_handler(dispatch,event);
    btnUndo.addEventListener('mousedown', undoClick);

    let btnShowSolution = document.getElementById("btnShowSolution");
    let showSolutionClick = (event) => Show_Solution_click_handler(dispatch, event);
    btnShowSolution.addEventListener('mousedown', showSolutionClick);

    //
}
export default GameField;