import { IRtkQueryError } from "../interfaces/errors";
import { setCurrentError } from "../../store/errors-slice";
import { Dispatch } from "@reduxjs/toolkit";
import { setIsAuthLoading } from "../../store/auth-slice";

export const handleRtkQuerryError = (error: unknown, dispatch: Dispatch) => {
    const rtkError = error as IRtkQueryError
    const errorData = rtkError.error.data
    dispatch(setCurrentError({
        code: errorData.statusCode,
        message: errorData.message
    }))
    dispatch(setIsAuthLoading(false))
}