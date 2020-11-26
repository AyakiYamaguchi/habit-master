import React from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-lato'
import './styles/reset.scss'
import './index.css';
import './styles/globalStyles.scss'
import 'normalize.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AuthProvider } from './store/Auth'
import PrivateRoute from './PrivateRoute'
import { StoreProvider } from './store/index'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <PrivateRoute>
        <StoreProvider>
          <App />
        </StoreProvider>
      </PrivateRoute>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
