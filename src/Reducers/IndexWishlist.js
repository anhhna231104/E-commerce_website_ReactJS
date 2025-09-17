import { combineReducers } from "redux";
import WishlistReducer from "./Wishlist";


const rootReducerWL = combineReducers({
    id: WishlistReducer
})

export default rootReducerWL;