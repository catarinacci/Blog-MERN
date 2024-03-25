import { createStore, combineReducers, applyMiddleware } from 'redux';
import {configureStore} from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { userReducerLogout, userReducerProfile, userReducerSingIn, userReducerSingUp } from './reducers/userReducer';

//conbine reducer
const reducer = combineReducers({
    singUp: userReducerSingUp,
    singIn: userReducerSingIn,
    userProfile: userReducerProfile,
    logOut: userReducerLogout
})

//initial state
let initialState = {
    signIn: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    }
}

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store