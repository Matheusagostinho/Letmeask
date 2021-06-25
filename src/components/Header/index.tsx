import { Link } from 'react-router-dom'
import { Button } from '../../components/Button/'
import { RoomCode } from '../../components/RoomCode'
import { useColorMode, IconButton } from '@chakra-ui/react'
import { FaSun, FaMoon } from 'react-icons/fa'
import logoImg from '../../assets/images/logo.svg'
import logoWhiteImg from '../../assets/images/logoWhite.svg'

import './styles.scss'
type HeaderProps={
  roomId: string
  handleEndRoom?: () => void
  isQuestioner?: boolean
}

export function Header({ roomId, handleEndRoom, isQuestioner = false }: HeaderProps) {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <header>
        <div className="content">
          <div>
          <Link to="/">
            <img src={colorMode === 'light' ? logoImg : logoWhiteImg} alt="LetmeAsk"/>
          </Link>
            <IconButton
              icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
              isRound= {true}
              size='lg'
              alignSelf='flex-end'
              onClick={toggleColorMode}
              aria-label="Color Mode"
              w="50px"
              h="50px"
              fontSize="2.3rem"
            />
          </div>

          <div className="right">
            <RoomCode code={roomId}/>
            {!isQuestioner &&
             <>
              <Button isOutlined onClick={handleEndRoom}> Encerar Sala</Button>
              <button className="smartphone close" onClick={handleEndRoom}>
                <div>
                    {/* <img src={deleteImg} alt="Copiar codigo"/> */}
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 5.99988H5H21" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
              </button>
             </>
            }
          </div>
        </div>
      </header>
  )
}
