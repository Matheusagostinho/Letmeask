/* eslint-disable no-use-before-define */
import React from 'react'
import { registerServiceWorker } from './serviceWorker'
import ReactDOM from 'react-dom'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import './services/firebase'
import './styles/global.scss'

ReactDOM.render(
  <React.StrictMode>
     <ChakraProvider>
        <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')

)
registerServiceWorker()
