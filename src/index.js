import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,useLocation} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import theme from './Styles/theme';
import {createStore,combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {loginReducers} from './Store/reducers';

const rootReducer = combineReducers({
  login:loginReducers,
})
const store = createStore(rootReducer)


export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </ThemeProvider>
   </Provider>,
  document.getElementById('root')
);

reportWebVitals();
