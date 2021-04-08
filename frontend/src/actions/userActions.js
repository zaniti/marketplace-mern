import axios from "axios"
import Cookie from 'js-cookie'
import jwt from 'jwt-decode'
import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_FAIL, USER_REGISTER_SUCCESS } from "../constants/userConstants"

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: {email, password}})
    try {
        const {data} = await axios.post("/client/login", {email, password})
        if(data.message){
              dispatch({ type: USER_SIGNIN_FAIL, payload: data.message})

        }else {
            const token = data.token;
            const user = jwt(token);
            dispatch({ type: USER_SIGNIN_SUCCESS, payload: user})
            localStorage.setItem('token', token);
            Cookie.set('userInfo', JSON.stringify(user));

        }

    } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error})
        
    }
}

const register = (nom,prenom,phone,email,password,adresse) => async (dispatch) => {
        dispatch({ type: USER_REGISTER_REQUEST})
    try {
        const {data} = await axios.post("/client/register", {nom,prenom,phone,email,password,adresse})
        if(data.message){
            dispatch({ type: USER_REGISTER_FAIL, payload: data.message})

        }else {
            dispatch({ type: USER_REGISTER_SUCCESS, payload: data.notification})

        }

    } catch (error) {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error})
        
    }
}



export {signin, register}