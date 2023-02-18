import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd/dist/core';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import './index.css';
import store from './services/root-store';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(
    document.getElementById('root')!
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router basename='/react-burger'>
                <DndProvider backend={HTML5Backend}>
                    <App />
                </DndProvider>
            </Router>
        </Provider>
    </React.StrictMode>
);
