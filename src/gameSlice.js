import { createSlice } from '@reduxjs/toolkit'

import { glob } from './Global'
import DrawManager from './DrawManager'
const checkGameEnd = (cellColors)=>
{
    let g = glob();
    let result = true;
    let cellsCount = g.cellsCount;
    let emptyCellIndex = Math.floor(cellsCount / 2);
    for (let i = 0; i < cellsCount; i++) {
        let color = cellColors[i];
        if (i < emptyCellIndex)
            result &&= (color == g.rightCheckerColor );
        else {
            if (i == emptyCellIndex)
                result &&= (color == g.emptyCheckerColor);
            else
                result &&= (color == g.leftCheckerColor);
        }

    }
    if (result)
        setTimeout(alert("You win!"), 1000);
    return result;
}
const setcellColors = () => {
    let g = glob();
    let result = [];
    let cellsCount = g.cellsCount;
    let emptyCellIndex = Math.floor(cellsCount / 2);
    for (let i = 0; i < cellsCount; i++) {
        if (i < emptyCellIndex)
            result.push(g.leftCheckerColor);
        else {
            if (i == emptyCellIndex)
                result.push(g.emptyCheckerColor);
            else
                result.push(g.rightCheckerColor);
        }

    }
    return result;
}
const createCheckers = () => {
    let drawman = new DrawManager();
    let arr = drawman.createCheckers();
    redrawCheckers(arr);
    return arr;
}
const redrawCheckers = (checkers) => {
    let drawman = new DrawManager();
    let arr = drawman.redrawCheckers(checkers);
    return arr;
}
const addMoveToProtocol = (move) => {
    let drawman = new DrawManager();
    drawman.addMoveToProtocol(move);
}
const rewriteProtocol = (moves) => {
    let drawman = new DrawManager();
    drawman.rewriteProtocol(moves);
}
const moveValidity = (beginInd, endInd, emptyCellId, cellColors) =>
{
    let g = glob();
   
    //Validity rules:
    // 1. endInd==emptyCellId
    // 2. if cellColors[beginInd-1]=="b" then endInd > beginInd
    //    if cellColors[beginInd-1]=="g" then endInd < beginInd
    // 3. abs(beginInd - endInd)<=2
    // 4. if abs(beginInd - endInd)==1 then cellColors[endInd-1]="0"
    // 5. if abs(beginInd - endInd)==2 then cellColors[(beginInd + endInd)/2-1]!="0"
    // that is intermediate cell can't be empty
    let result = (endInd == emptyCellId) && (beginInd != emptyCellId);
    if (result)
    {
        if (cellColors[beginInd - 1] == g.leftCheckerColor)
            result = endInd > beginInd;
        else
            result = endInd < beginInd;
    }
    if (result)
    {
        if (Math.abs(beginInd - endInd) == 1)
            result = (endInd == emptyCellId);
        else
        {
            if (Math.abs(beginInd - endInd) == 2)
                result = (beginInd + endInd) / 2 != emptyCellId;
            else
                result = false;
        }
    }
    return result;
}

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        moveBegin: false,
       
        beginCellId: 0, //id of a cell where first click of a move was done
        emptyCellId: 4, //current id of the empty cell
        cellColors: setcellColors(),        
        checkers: createCheckers(), // initialize 3 black, empty and 3 green 
        moves:[]
    },
    reducers: {
       
       
        //
        //Possible actions types:
        // - move - after click on a cell
        // - undo last move
        move: (state, action) => {
            let g = glob();
            if (!state.moveBegin) {
                state.moveBegin = true;
                state.beginCellId = action.payload;
            }
            else {                
                let beginInd = state.beginCellId;
                let endInd = action.payload;
                let emptyCellId = state.emptyCellId;
                let cellColors = state.cellColors;
                if (moveValidity(beginInd, endInd, emptyCellId, cellColors)) {
                    //add element to moves
                    let newmove = [beginInd, endInd];
                    state.moves.push(newmove);
                    state.emptyCellId = beginInd;
                    state.cellColors[endInd - 1] = state.cellColors[beginInd - 1];
                    state.cellColors[beginInd - 1] = g.emptyCheckerColor;
                   //redraw checkers according new colors   
                    let checkers = state.checkers;
                    for (var i = 0; i < checkers.length; i++) {
                        checkers[i].color = state.cellColors[i];
                    }
                    redrawCheckers(checkers);
                    addMoveToProtocol(newmove);
                }                
                state.moveBegin = false;
                checkGameEnd(state.cellColors);
                //if (checkGameEnd(state.cellColors))
                //    alert("You win!")
            }
        },
        undo: (state, action) => {
            //get last move from moves as  [beginInd, endInd]
            //change cellColors[beginInd - 1] as cellColors[endInd - 1]
            // and cellColors[endInd - 1]  as empty
            //change checkers  colors
            //redraw checkers
            //remove last move fom moves
            //rewrite protocol by moves
            if (state.moves.length == 0)
                return;
            let g = glob();
            let lastMove = state.moves[state.moves.length - 1];
            let beginInd = lastMove[0];
            let endInd = lastMove[1];
            state.cellColors[beginInd - 1] = state.cellColors[endInd - 1];
            state.cellColors[endInd - 1] = g.emptyCheckerColor;
            state.emptyCellId = endInd;
            let changedCheckers = [state.checkers[beginInd - 1],
                state.checkers[endInd - 1]];
            changedCheckers[0].color = state.cellColors[beginInd - 1];
            changedCheckers[1].color = state.cellColors[endInd - 1];
            redrawCheckers(changedCheckers);
            state.moves.pop();
            rewriteProtocol(state.moves);
        },
        showSolution: (state, action) => {
            //this reducer not in use beccause it shows all steps immediately
            let g = glob();
            state.moveBegin = false;
            state.emptyCellId = 4;
            state.cellColors= setcellColors();
            state.checkers = createCheckers();
            
            let solArr = g.solution;
            for (var i = 0; i < solArr.length; i++) {
                let beginInd = solArr[i][0];
                let endInd = solArr[i][1];
                let changedCheckers = [state.checkers[beginInd - 1],
                    state.checkers[endInd - 1]];
                state.cellColors[endInd - 1] = state.cellColors[beginInd - 1];
                state.cellColors[beginInd - 1] = g.emptyCheckerColor;
                state.emptyCellId = beginInd;
                changedCheckers[0].color = state.cellColors[beginInd - 1];
                changedCheckers[1].color = state.cellColors[endInd - 1];
                
                    redrawCheckers(changedCheckers);
                    state.moves[i] = solArr[i];
                    addMoveToProtocol(state.moves[i]);
                
                
            }
        },
        solutionStep: (state, action) => {
            let input = action.payload;
            //let g = glob();
            //let solArr = g.solution;
            let i = input.i;
           
            let beginInd = input.beginInd;// solArr[i][0];
            let endInd = input.endInd;  //solArr[i][1];
            let changedCheckers = [state.checkers[beginInd - 1],
            state.checkers[endInd - 1]];
            state.cellColors[endInd - 1] = state.cellColors[beginInd - 1];
            state.cellColors[beginInd - 1] = "white"; //g.emptyCheckerColor;
            state.emptyCellId = beginInd;
            changedCheckers[0].color = state.cellColors[beginInd - 1];
            changedCheckers[1].color = state.cellColors[endInd - 1];
            redrawCheckers(changedCheckers);
            state.moves[i] = [beginInd, endInd]; //solArr[i];
            addMoveToProtocol(state.moves[i]);
        }
    }
})

// Action creators are generated for each case reducer function
export const { move, undo, showSolution, solutionStep } = gameSlice.actions

export default gameSlice.reducer