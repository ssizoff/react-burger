import { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { IUser } from './burger-api';

export type TProtectedRouteProps = {
    path: string;
    exact?: boolean;
    needAuth?: boolean;
};

export default function ProtectedRoute({
    path,
    exact,
    children,
    needAuth = true,
}: PropsWithChildren<TProtectedRouteProps>): JSX.Element {
    const { pathname, state } = useLocation<{ from?: string }>();
    const auth: IUser | undefined = useSelector<
        { user: { auth?: IUser } },
        IUser | undefined
    >(state => state.user.auth);

    if (needAuth && !auth) {
        return (
            <Redirect
                from={path}
                exact={exact}
                to={{ pathname: '/login', state: { from: pathname } }}
            />
        );
    }

    if (!needAuth && auth)
        return <Redirect from={path} exact={exact} to={state?.from ?? '/'} />;

    return (
        <Route path={path} exact={exact}>
            {children}
        </Route>
    );
}
