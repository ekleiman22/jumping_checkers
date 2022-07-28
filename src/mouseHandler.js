import { move } from './gameSlice'

export function Checker_click_handler(dispatch, event, id, centerX, centerY, checkerRadius,
    canvas)
{
    var rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    event.stopPropagation();    
    if (Math.abs(x -  centerX) < checkerRadius
        && Math.abs(y - centerY) < checkerRadius    )
    {
        //alert("id =" + id);
        dispatch(move(id));
    }    
}

export default Checker_click_handler;