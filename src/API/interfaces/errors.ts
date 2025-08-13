export interface IServerErrorData {
    message: string,
    error: string,
    statusCode: number
}

export interface IRtkQueryError {
    error: {
        data: IServerErrorData,
        status: number
    }
    isUnhandledError: boolean,
    meta: unknown
}