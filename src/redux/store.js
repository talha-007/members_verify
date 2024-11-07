// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./slice/rootReducer";


export const store=configureStore({
    reducer:rootReducer
})