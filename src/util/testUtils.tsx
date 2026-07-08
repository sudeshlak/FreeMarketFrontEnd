import { ReactElement } from "react";
import { createStore } from "redux";
import { rootReducer } from '../state/reducers';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from "react-redux";
import React from "react";

export function renderWithRedux (
    ui:ReactElement,
    options?:RenderOptions
){
    const store = createStore(rootReducer);
    return {
        store,
        ...render(<Provider store={store}> {ui} </Provider>,options),
    }
}