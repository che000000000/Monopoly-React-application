import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hoocks/useAppSelector';
import { AuthStateT } from '../types/auth';

const NoAuthRedirect = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const ComponentWithAuthRedirect = (props: P) => {
        const authState: AuthStateT = useAppSelector(state => state.auth)

        if (authState.isAuthLoading) return <div>Loading...</div>

        if (authState.isAuth === false) {
            return <Navigate to={'/login'} />
        }

        return <WrappedComponent {...props} />
    }

    return ComponentWithAuthRedirect
}

export default NoAuthRedirect;