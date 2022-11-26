import React from 'react';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';

function App() {
    return (
        <div className="p-4">
            <AppHeader />
            <div style={{ width: 1240, margin: 'auto', position: 'relative' }}>
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
            </div>
        </div>
    );
}

export default App;
