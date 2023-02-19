import { createSlice } from '@reduxjs/toolkit';

const accountsSlice = createSlice({
    name: 'accounts',
    initialState: {
        accounts: {},
        error: '',
    },
    reducers: {
        getDataAccounts(state, action) {
            var keys = Object.keys(action.payload.accounts)
            for (var i = 0; i < Object.keys(action.payload.accounts).length; i++) {
                state.accounts[keys[i]] = {
                    image: action.payload.accounts[keys[i]].image,
                    password: action.payload.accounts[keys[i]].password,
                }
            }
        },
        setErrorAccounts(state, action) {
            state.error = action.payload.error
            console.log(state.error)
        },
    }
})

export const { getDataAccounts, setErrorAccounts } = accountsSlice.actions;
export default accountsSlice.reducer;