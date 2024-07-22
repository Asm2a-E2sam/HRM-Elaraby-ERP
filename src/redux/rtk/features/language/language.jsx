import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
    name: 'language',
    initialState: {
        language: localStorage.getItem("language") || 'en'
    },
    reducers: {
        changeLanguageSlice: function (state, action) {
            state.language = action.payload;
            console.log(state.language);
            localStorage.setItem("language", state.language);
        },
    },
});

export const { changeLanguageSlice } = languageSlice.actions;

export default languageSlice.reducer;