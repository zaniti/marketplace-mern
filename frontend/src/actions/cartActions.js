import axios from "axios";
import { CART_LIST_FAIL, CART_LIST_REQUEST, CART_LIST_SUCCESS, CART_REMOVE_ITEM, CART_REMOVE_FAIL, CART_EDIT_ITEM, CART_EDIT_FAIL} from "../constants/cartConstants";



const addToCart = (productId,clientId, qty) => async (dispatch) => {
    try {
        await axios.post("/panier/add", {
            idProduit: productId,
            idClient: clientId,
            Quantite: qty
           
        })

        window.location.href = "/cart";
        
    } catch (error) {
        
    }
}

const listCart = (id) => async (dispatch) => {
    try{
        dispatch({type: CART_LIST_REQUEST});
        const {data} = await axios.get("/panier/" + id);
        dispatch({type: CART_LIST_SUCCESS, payload:data})
    }catch(error){
        dispatch({type: CART_LIST_FAIL, payload:error.message})

    }
}

const removeFromCart = (cartId) => async (dispatch) => {
    try {
        await axios.delete("/panier/delete/" + cartId)
        dispatch({type: CART_REMOVE_ITEM, payload: cartId})
        
    } catch (error) {
        dispatch({type: CART_REMOVE_FAIL, payload: error})
        
    }
}

const editCart = (cartId, qty) => async (dispatch) => {
    try {
        await axios.put("/panier/update/" + cartId, {Quantite: qty})
        dispatch({type: CART_EDIT_ITEM, payload: {cartId, qty}})

        
    } catch (error) {
        dispatch({type: CART_EDIT_FAIL, payload: error})
        
    }
}



export {listCart, removeFromCart, addToCart, editCart}