import { useColorMode } from '@chakra-ui/react'
import copyImg from '../../assets/images/copy.svg'
import './room-code.scss'

 type RoomCodeProps = {
   code: string
 }

export function RoomCode(props: RoomCodeProps) {
  const { colorMode } = useColorMode()
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  }

  return (
    <button className={`room-code ${colorMode}`} onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copiar codigo"/>
      </div>
      <div className={`code ${colorMode}`}> Sala #{props.code}</div>
    </button>
  )
}
