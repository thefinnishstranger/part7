import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authenticationReducer from "./reducers/authenticationReducer"
import blogsReducer from "./reducers/blogsReducer"
import formSlice from "./reducers/formSlice"
import usersSlice from "./reducers/usersSlice"
import commentReducer from "./reducers/commentReducer"

const rootReducer = combineReducers({
    blogs: blogsReducer,
    authentication: authenticationReducer,
    form: formSlice,
    users: usersSlice,
    comments: commentReducer
})


const store = configureStore({
    reducer: rootReducer
})

export default store