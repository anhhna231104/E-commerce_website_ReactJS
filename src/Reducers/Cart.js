const totalCart = {
    total: 0
}

const cartReducer = (state = totalCart, action) => {
    switch (action.type) {
        case "ADD_CART": {

            
            return {
                total: action.payload
            }
        }

        default:
            return state
    }
}
export default cartReducer; 