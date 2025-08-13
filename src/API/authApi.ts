import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ILoginReqBody, ILoginResData, IRegisterReqBody } from './interfaces/auth';
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
        login: build.mutation<ILoginResData, ILoginReqBody>({
            query: (requestBody: ILoginReqBody) => ({
                url: '/auth/login',
                method: 'POST',
                body: requestBody,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const request = await queryFulfilled
                    dispatch(loginUser(request.data))
                } catch (error) {
                    handleRtkQuerryError(error, dispatch)
                }
            }
        }),
        register: build.mutation<null, IRegisterReqBody>({
            query: (requestBody: IRegisterReqBody) => ({
                url: '/auth/register',
                method: 'POST',
                body: requestBody
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch (error) {
                    handleRtkQuerryError(error, dispatch)
                }
            },
        })
    })
})

export const { useLoginMutation, useRegisterMutation } = authApi;