/* eslint-disable no-use-before-define */
import React from 'react'
import { registerServiceWorker } from './serviceWorker'
import ReactDOM from 'react-dom'
import App from './App'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './styles/theme'
import './services/firebase'
import './styles/global.scss'

ReactDOM.render(
  <React.StrictMode>
     <ChakraProvider theme={theme}>
     <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')

)
registerServiceWorker()
