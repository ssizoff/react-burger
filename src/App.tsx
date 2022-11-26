import React from 'react';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';

function App() {
    return (
        <>
            <AppHeader />

            <main style={{ width: 1240, margin: 'auto', position: 'relative' }}>
                <div
                    style={{
                        width: 600,
                        height: 912,
                        border: '2px solid #4C4CFF',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                    }}
                >
                    <BurgerConstructor />
                </div>
                <div
                    style={{
                        width: 600,
                        height: 912,
                        border: '2px solid #4C4CFF',
                        position: 'absolute',
                        right: 0,
                        top: 0,
                    }}
                />
            </main>
        </>
    );
}

export default App;
