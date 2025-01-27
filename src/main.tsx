import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import './i18n/config';

const theme = extendTheme({
  fonts: {
    heading: '"Poppins", "Noto Sans", "Noto Sans Tamil", "Noto Sans Telugu", "Noto Sans Malayalam", "Noto Sans Devanagari", sans-serif',
    body: '"Poppins", "Noto Sans", "Noto Sans Tamil", "Noto Sans Telugu", "Noto Sans Malayalam", "Noto Sans Devanagari", sans-serif',
  },
  // Rest of the theme config remains the same
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);