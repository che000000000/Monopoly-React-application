import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ILoginReqBody, ILoginResData, IRegisterReqBody } from '../interfaces/auth';
import { loginUser, setOauthUrl } from '../../store/auth-slice';
import { handleRtkQuerryError } from '../common/handleRtkQuerryError';
import { OauthMethod } from '../enums/oauth-method';

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
        }),
        getOauthUrl: build.mutation<any, OauthMethod>({
            query: (oauthMethod: OauthMethod) => ({
                url: `/auth/oauth/${oauthMethod}`,
                method: 'GET'
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const response = await queryFulfilled
                    dispatch(setOauthUrl(response.data.oauthUrl))
                } catch (error) {
                    handleRtkQuerryError(error, dispatch)
                }
            }
        }),
        getUserProfile: build.mutation<any, void>({
            query: () => ({
                url: '/users/profile',
                method: 'GET',
                cache: 'no-cache'
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const response = await queryFulfilled
                    dispatch(loginUser({
                        id: response.data.id,
                        name: response.data.name,
                        avatarUrl: response.data.avatarUrl,
                        role: response.data.role
                    }))
                } catch (error) {
                    handleRtkQuerryError(error, dispatch)
                }
            },
        })
    })
})

export const { useLoginMutation, useRegisterMutation, useGetOauthUrlMutation, useGetUserProfileMutation } = authApi;