import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import thunk from 'redux-thunk'
import { cartListReducer } from './reducers/cartReducers'
import { userRegisterReducer, userSigninReducer } from './reducers/userReducers'
import Cookie from 'js-cookie'


const userInfo = Cookie.getJSON("userInfo") || null;



const initialState = {userSignin: {userInfo}}
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cartList: cartListReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk))) //thunk allows async action in redux
export default store;