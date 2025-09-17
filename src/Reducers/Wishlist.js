const initialWL = []

const WishlistReducer = (state = initialWL, action) => {
    switch (action.type) {
        case "ADD_WISHLIST": {
            return [...state, action.payload];
        }

        default:
            return state;
    }
}
export default WishlistReducer;
