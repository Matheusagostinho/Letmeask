
import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config : ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false

}

const theme = extendTheme({
  config,
  colors: {
    white: '#f8f8f8'
  }

})
export default theme
