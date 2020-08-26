import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProvider } from 'styled-components';
import { theme } from './styled/theme';
import Home from './components/Home';
import Main from './components/Main';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Main />
        <Home />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
