import { IRtkQueryError } from "./interfaces/errors";
import { setCurrentError } from "../store/errors-slice";
import { Dispatch } from "@reduxjs/toolkit";

export const handleRtkQuerryError = (error: unknown, dispatch: Dispatch) => {
    const rtkError = error as IRtkQueryError
    const errorData = rtkError.error.data
    dispatch(setCurrentError({
        code: errorData.statusCode,
        message: errorData.message
    }))
}