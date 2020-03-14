import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

//need to change root under Reducers?
//import { reducer as formReducer } from 'redux-form';

import { verifyAuth } from './actions/';
import rootReducer from './reducers';

export default function configureStore(persistedState) {
    const store = createStore(
        rootReducer,
        persistedState,
        applyMiddleware(thunkMiddleware)
    );
    store.dispatch(verifyAuth());
    return store;
}