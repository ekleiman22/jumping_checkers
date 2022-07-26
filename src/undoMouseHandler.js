
import { undo } from './gameSlice'
export function Undo_click_handler(dispatch, event) {
    dispatch(undo());
}
export default Undo_click_handler;