import { CART_EDIT_FAIL, CART_EDIT_ITEM, CART_LIST_FAIL, CART_LIST_REQUEST, CART_LIST_SUCCESS, CART_REMOVE_FAIL, CART_REMOVE_ITEM } from "../constants/cartConstants";

function cartListReducer(state = {products:[]}, action){
    switch (action.type){
        case  CART_LIST_REQUEST:
            return {loading: true};
        case CART_LIST_SUCCESS:
            return {loading:false, products: action.payload};
        case CART_LIST_FAIL:
            return {loading:false, error: action.payload};

        case CART_REMOVE_ITEM:
            return {loading:false, products: state.products.filter(x=> x._id!==action.payload)}
        case CART_REMOVE_FAIL:
            return {loading:false, error: action.payload};

        case CART_EDIT_ITEM:
            const newProducts = [...state.products]
            const index = newProducts.findIndex(r => r._id === action.payload.cartId)
            newProducts[index].Quantite = action.payload.qty
            return {loading:false, products: newProducts}
        case CART_EDIT_FAIL:
            return {loading:false, error: action.payload};

        
            default:
        return state;
    }
}

export {cartListReducer}