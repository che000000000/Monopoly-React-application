import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit"
import { ErrorsStateT, SetCurrentErrorPayloadT } from "./types/errors";

const initialState: ErrorsStateT = {
    currentError: null
}

const errorsSlice: Slice = createSlice({
    name: 'errors',
    initialState,
    reducers: {
        setCurrentError(state, action: PayloadAction<SetCurrentErrorPayloadT>) {
            state.currentError = {
                code: action.payload.code,
                message: action.payload.message
            }
        },
    }
})

export const { setCurrentError } = errorsSlice.actions;

export default errorsSlice.reducer;