import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface AuthState {
    user: Object | null,
    name: String,
    count: number,
    access_token: string
}

const initialState: AuthState = {
    user: null,
    name: "H5",
    count: 1,
    access_token: "",
}

export const addScoreAsync: any = createAsyncThunk(
    "auth/addScoreAsync",
    async (count: number) => {
        const data = await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(count)
            }, 5000)
        })
        return data
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken(state, action) {
            state.user = action.payload
        },
        addScore: state => {
            state.count += 1
        },
        minusScore: state => {
            state.count -= 1
        }
    },
    //这里对异步操作incrementAsync异步状态的处理
    extraReducers: builder => {
        builder
            .addCase(addScoreAsync.pending, state => {
            })
            .addCase(addScoreAsync.fulfilled, (state, action) => {
                state.count += action.payload
            })
            .addCase(addScoreAsync.rejected, state => {
            })
    }

})
const { actions, reducer } = authSlice;

export const { setToken, addScore, minusScore } = actions;

export default reducer;