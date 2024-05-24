import { defaultTheme } from './styles/themes/default.ts'
import { ThemeProvider } from 'styled-components';
import { Router } from './Router.tsx';
import { GlobalStyle } from './styles/themes/global.ts';
import { BrowserRouter } from 'react-router-dom';
import { CyclesContextProvider } from './contexts/CyclesContext.tsx';

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  )
}

