import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hoocks/useAppSelector';
import { AuthStateT } from '../store/types/auth';

const AuthRedirect = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const ComponentWithNoAuthRedirect = (props: P) => {
        const authState: AuthStateT = useAppSelector(state => state.auth)

        if (authState.isAuthLoading) return null

        if (authState.isAuth === true) {
            return <Navigate to={'/'} />
        }

        return <WrappedComponent {...props} />
    }

    return ComponentWithNoAuthRedirect
}

export default AuthRedirect;