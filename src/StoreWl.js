import { legacy_createStore as createStore } from 'redux';
import rootReducerWL from "./Reducers/IndexWishlist";

const storeWL = createStore(rootReducerWL)


export default storeWL;