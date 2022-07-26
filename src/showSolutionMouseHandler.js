import { glob } from './Global'
import {  solutionStep } from './gameSlice'
export function  Show_Solution_click_handler(dispatch, event) {
    let g = glob();
    let movesCount = g.solution.length;
    let txtProtocol = document.getElementById("txtProtocol");
    txtProtocol.textContent = "";
    callStep(0, movesCount, g, dispatch);
}
 const callStep = (i, movesCount, g, dispatch) =>
{
    if (i == movesCount)
        return;
    let input = {};
    input.i = i;
    input.beginInd = g.solution[i][0];
     input.endInd = g.solution[i][1];
     dispatch(solutionStep(input))
    const timer = setTimeout(
        () => callStep(i, movesCount, g, dispatch),
        3000)    
    i++;
    
    //return () => clearTimeout(timer);
}

export default Show_Solution_click_handler;