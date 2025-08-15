export type CurrentErrorT = {
    code: number,
    message: string
}

export type SetCurrentErrorPayloadT = {
    code: number,
    message: string
}

export type ErrorsStateT = {
    currentError: CurrentErrorT | null
}