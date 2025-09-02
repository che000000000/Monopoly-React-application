import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hoocks/useAppSelector';
import { AuthStateT } from '../store/slices/auth/types/auth-state';

const NoAuthRedirect = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const ComponentWithAuthRedirect = (props: P) => {
        const authState: AuthStateT = useAppSelector(state => state.auth)

        if (authState.isAuthLoading) return null

        if (authState.isAuth === false) {
            return <Navigate to={'/login'} />
        }

        return <WrappedComponent {...props} />
    }

    return ComponentWithAuthRedirect
}

export default NoAuthRedirect;