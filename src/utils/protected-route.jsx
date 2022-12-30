import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';

export default function ProtectedRoute({
    path,
    exact,
    children,
    needAuth = true,
}) {
    const { pathname, state } = useLocation();
    const { auth } = useSelector(state => state.user);

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

ProtectedRoute.propTypes = {
    path: PropTypes.string.isRequired,
    needAuth: PropTypes.bool,
    exact: PropTypes.bool,
};
