import { useColorMode } from '@chakra-ui/react'
import { ButtonHTMLAttributes } from 'react'

import '../../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  const { colorMode } = useColorMode()
  return (
    <button className={`button ${isOutlined ? 'outlined' : ''} ${colorMode}`} {...props} />
  )
}
