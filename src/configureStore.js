import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

//need to change root under Reducers?
//import { reducer as formReducer } from 'redux-form';

import { verifyAuth } from './actions/';
import rootReducer from './reducers';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default function configureStore(persistedState) {
    const store = createStore(
        rootReducer,
        persistedState,
        composeEnhancers(
            applyMiddleware(thunkMiddleware)
        )
    );
    store.dispatch(verifyAuth());
    return store;
}