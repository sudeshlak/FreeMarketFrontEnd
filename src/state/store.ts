import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./reducers";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { persistStore } from "redux-persist";

export default function configureStore() {
    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    );
    const persistor = persistStore(store);
    return { store, persistor };
}