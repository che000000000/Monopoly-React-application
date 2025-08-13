import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ILoginReqBody } from './interfaces/auth';
import { loginUser } from '../store/auth-slice';
import { handleRtkQuerryError } from './handleRtkQuerryError';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:7507',
    credentials: 'include'
})

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery,
    endpoints: (build) => ({
        login: build.mutation<any, ILoginReqBody>({
            query: (requestBody: ILoginReqBody) => ({
                url: '/auth/login',
                method: 'POST',
                body: requestBody,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(loginUser(null))
                } catch (error) {
                    handleRtkQuerryError(error, dispatch)
                }
            }
        }),
    })
})

export const { useLoginMutation } = authApi;