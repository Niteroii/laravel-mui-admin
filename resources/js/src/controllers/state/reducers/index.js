import { combineReducers } from '@reduxjs/toolkit';

import app from './app';
import notifications from './notifications';
import resources from './resources';

const rootReducer = combineReducers({
    app,
    notifications,
    resources,
});


export default rootReducer;

