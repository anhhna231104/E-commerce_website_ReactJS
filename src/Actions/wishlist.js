
export const AddToWishlist = (getID) => {
    return {
        type: "ADD_WISHLIST",
        payload: getID
    }
}