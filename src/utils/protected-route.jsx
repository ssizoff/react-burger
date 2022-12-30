import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function ProtectedRoute({
    path,
    exact,
    children,
    needAuth = true,
}) {
    const { auth } = useSelector(state => state.user);

    if (needAuth && !auth)
        return <Redirect to={{ pathname: '/login', state: { from: path } }} />;

    if (!needAuth && auth) return <Redirect to="/" />;

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
