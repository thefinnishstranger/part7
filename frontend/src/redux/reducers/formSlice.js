import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
    name: 'form',
    initialState: {
        login: {
            username: "",
            password: ""
        },
        blog: {
            title: "",
            author: "",
            url: ""
        },
        visibility: {
            loginVisible: false
        }
    },
    reducers: {
        setLoginField: (state, action) => {
            state.login[action.payload.field] = action.payload.value
        },
        setBlogField: (state, action) => {
            state.blog[action.payload.field] = action.payload.value
        },
        clearLoginForm: (state) => {
            state.login.username = ""
            state.login.password = ""
        },
        clearBlogForm: (state) => {
            state.blog.title = ""
            state.blog.author = ""
            state.blog.url = ""        
        },
        setLoginVisible: (state, action) => {
            state.visibility.loginVisible = action.payload
        },
        handleFieldChange: (state, action) => {
            const { field, value } = action.payload
            state.blog[field] = value
        }
    }
})

export const { setLoginField, setBlogField, clearLoginForm, clearBlogForm, setLoginVisible, handleFieldChange } = formSlice.actions
export default formSlice.reducer