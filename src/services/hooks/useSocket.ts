import { useEffect } from 'react';
import { useAppDispatch } from '../root-store';
import { socketStart, socketStop } from './../actions/socket-actions';
import { useAppSelector } from './../root-store';

export function useSocket() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(socketStart());

        return () => {
            dispatch(socketStop());
        };
    }, [dispatch]);
}

export function useAuthSocket() {
    const { accessToken } = useAppSelector(state => state.user.auth!);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = accessToken.replace('Bearer ', '');

        dispatch(socketStart(token));

        return () => {
            dispatch(socketStop());
        };
    }, [dispatch, accessToken]);
}
