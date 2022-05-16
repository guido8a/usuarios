//usa thunk y aplica un midleware
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/rootReducer';
// import { createStore } from "@reduxjs/toolkit";


//uso de varios midleware
const composeEnhancers = (typeof window !== 'undefined' && 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware( thunk )
    )
)