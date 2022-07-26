import { move } from './gameSlice'

export function Checker_click_handler(dispatch,event,id, centerX, centerY, checkerRadius) {
    event.stopPropagation();    
    if (Math.abs(event.x - centerX) < checkerRadius
        && Math.abs(event.y - centerY) < checkerRadius    )
    {
        //alert("id =" + id);
        dispatch(move(id));
    }    
}

export default Checker_click_handler;