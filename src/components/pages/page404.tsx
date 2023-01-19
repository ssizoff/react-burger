import styles from './login.module.css';
import { useLocation } from 'react-router-dom';

export default function Page404() {
    const { pathname } = useLocation();

    return (
        <div className={`mt-20 ${styles.panel}`}>
            <div>
                <p className="text text_type_main-large text_color_error">
                    {`Страница не найдена "${pathname}"`}
                </p>
            </div>
        </div>
    );
}
